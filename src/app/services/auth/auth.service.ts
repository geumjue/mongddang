import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError, BehaviorSubject } from 'rxjs';
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { Injectable } from '@angular/core';
import axios from 'axios'; // axios 모듈 임포트
import { jwtDecode } from 'jwt-decode'; // jwt-decode 모듈 임포트
import { UserService } from '../user/user.service'; // UserService 임포트
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';

export interface User {
  id: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';
  public user: User | null = null;

  // 로그인 상태를 관리하는 BehaviorSubject
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService // UserService 주입
  ) {
    this.initializeUser(); // 서비스 초기화 시 사용자 정보 설정
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  public initializeUser() {
    const userId = this.getUserIdFromToken();
    
    if (userId) {
      // 초기값으로 'Unknown'을 설정하고, 이후 API 호출로 사용자 정보를 가져옴
      this.user = { id: userId, username: 'Unknown', email: 'Unknown' };
  
      // API 호출로 사용자 정보 가져오기
      this.userService.getUserById(parseInt(userId, 10)).subscribe({
        next: (userData: GetUserResponseData) => {
          if (this.user) {
            // API 응답 데이터로 사용자 정보 업데이트
            this.user.username = userData.username;
            this.user.email = userData.email;
            console.log('Fetched user data:', this.user);
          }
        },
        error: (err: any) => {
          console.error('Failed to fetch user data:', err);
        }
      });
    } else {
      console.warn('User ID is not available, cannot fetch user data.');
    }
  }
  

  // 로그인 상태를 Observable로 제공
  getLoginStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  // 회원가입 메서드
  signUp(data: SignUpRequestData): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data, { headers }).pipe(
      catchError(error => {
        console.error('회원가입 오류:', error);
        return of({
          success: false,
          data: null,
          statusCode: error.status,
          message: error.message,
        } as AuthResponse);
      })
    );
  }

  // 로그인 메서드
  login(data: SignInRequestData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.user = {
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
          };

          console.log('AuthService user after login:', this.user); // 디버깅용
          localStorage.setItem('token', response.data.token);
          this.loggedInSubject.next(true);
          this.router.navigate(['/mypage']);
        }
      }),
      catchError(error => {
        console.error('로그인 오류:', error);
        return of({
          success: false,
          data: null,
          statusCode: error.status,
          message: error.message,
        } as AuthResponse);
      })
    );
  }

  logOut(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearUserData();
        this.loggedInSubject.next(false);
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => {
        console.error('로그아웃 오류:', error);
        return of({});
      })
    );
  }

  // 수정된 회원 탈퇴 메서드
  deleteAccount(password: string): Promise<any> {
    const token = this.extractToken();
    const userId = this.getUserIdFromToken();
    if (!userId || !token) {
      console.error('사용자 ID 또는 토큰이 유효하지 않습니다.');
      return Promise.resolve(null);
    }

    return axios
      .delete(`${this.apiUrl}/users/${userId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { password },
      })
      .then(response => {
        if (response.status === 200) {
          this.clearUserData();
          console.log('회원 탈퇴가 성공적으로 완료되었습니다.');
          window.location.reload();
        } else {
          console.error('회원 탈퇴 요청 실패:', response.data);
        }
      })
      .catch(error => {
        console.error('회원 탈퇴 오류:', error);
        return null;
      });
  }

  private clearUserData(): void {
    localStorage.removeItem('token');
    this.user = null;
  }

  public isLoggedIn(): boolean {
    return !!this.extractToken();
  }

  public getUserIdFromToken(): string | null {
    const token = this.extractToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.userId; // 'userId' 필드 반환
    } catch (error) {
      console.error('토큰 디코드 오류:', error);
      return null;
    }
  }

  public extractToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserInfo(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`).pipe(
      catchError(error => {
        console.error('사용자 정보 가져오기 오류:', error);
        return of(null);
      })
    );
  }
}
