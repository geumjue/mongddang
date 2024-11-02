import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError, BehaviorSubject } from 'rxjs';
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';  // 수정된 부분: jwt_decode로 임포트

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
  public user: { id: string; username: string; email: string } | null = null;

  // 로그인 상태를 관리하는 BehaviorSubject
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {
    this.initializeUser(); // 서비스 초기화 시 사용자 정보 설정
  }
  public  initializeUser() {
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

  deleteAccount(password: string): Observable<any> {
    const userId = this.getUserIdFromToken();
    return this.http.post(`${this.apiUrl}/users/${userId}/delete`, { password }).pipe(
      tap(() => {
        this.logOut();
      }),
      catchError(error => {
        console.error('회원 탈퇴 오류:', error);
        return of(null);
      })
    );
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
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded token:', decodedToken); // 디버깅용 출력
      return decodedToken?.sub || decodedToken?.userId || null;
    } catch (error) {
      console.error('토큰 디코딩 오류:', error);
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
