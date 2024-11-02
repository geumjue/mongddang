import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError, BehaviorSubject } from 'rxjs';
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { Injectable } from '@angular/core';
import axios from 'axios'; // axios 모듈 임포트
import { jwtDecode } from 'jwt-decode'; // jwt-decode 모듈 임포트

export interface User {
  id: string;  // 추가된 id 속성
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

  constructor(private http: HttpClient, private router: Router) {
    this.initializeUser(); // 서비스 초기화 시 사용자 정보 설정
  }

  public initializeUser() {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.user = { id: userId, username: 'Unknown', email: 'Unknown' }; // 필요한 경우 추가 API 호출로 사용자 정보 가져오기
      console.log('Initialized user:', this.user);
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
    const token = this.extractToken(); // 로컬스토리지에서 토큰 가져오기
    const userId = this.getUserIdFromToken(); // 토큰에서 사용자 ID 가져오기
    if (!userId || !token) {
      console.error('사용자 ID 또는 토큰이 유효하지 않습니다.');
      return Promise.resolve(null); // 유효하지 않으면 null 반환
    }

    return axios
      .delete(`${this.apiUrl}/users/${userId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { password }, // DELETE 요청의 body에 비밀번호 포함
      })
      .then(response => {
        if (response.status === 200) {
          this.clearUserData(); // 요청이 성공적으로 완료되면 로컬스토리지 데이터 삭제
          console.log('회원 탈퇴가 성공적으로 완료되었습니다.');
          window.location.reload(); // 페이지 새로고침 추가
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
      const decoded: any = jwtDecode(token); // jwt-decode를 사용하여 토큰 디코드
      return decoded.userId; // 'id'를 'userId'로 수정
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
