import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // 수정된 임포트 방법
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/common/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';

  public user: { username: string; email: string } | null = null;

  // 1. BehaviorSubject로 로그인 상태 관리
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  private checkInitialLoginStatus(): boolean {
    const token = this.extractToken();
    return token !== null;
  }

  // 회원가입 메소드
  signUp(data: SignUpRequestData): Observable<ApiResponse<AuthResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/signup`, data, { headers, withCredentials: true });
  }

  // 로그인 상태를 Observable로 반환하는 메소드
  getLoginStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }


  // 로그인 메소드 (기존)
  logIn(data: SignInRequestData): Observable<AuthResponse> {
    // 이미 로그인 상태라면 마이페이지로 리다이렉트
    if (this.isLoggedIn()) {

      this.router.navigate(['/mypage']);
      return of({
        success: false,
        data: null,
        statusCode: 403,
        message: 'Already logged in',
      } as unknown as ApiResponse<AuthResponse>);
    }

    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/signin`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.user = {
            username: response.data.user.username,
            email: response.data.user.email,
          };
          this.loggedInSubject.next(true);
          this.router.navigate(['/mypage']);
        }
      }),
      catchError(error => {
        return of({
          success: false,
          data: null,
          statusCode: error.status,
          message: error.message,
        } as unknown as ApiResponse<AuthResponse>);
      })
    );
  }

  // 새로운 로그인 메서드 추가
  login(credentials: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // 로그아웃 메소드
  logOut(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearCookies();
        this.user = null;
        this.loggedInSubject.next(false); // 로그인 상태를 false로 설정
        console.log('로그아웃 성공');
        this.router.navigate(['/']); // 로그아웃 후 메인 페이지로 이동
      }),
      catchError(error => {
        console.error('Logout error:', error);
        return of({
          success: false,
          data: null,
          statusCode: error.status,
          message: error.message,
        } as ApiResponse<null>);
      })
    );
  }

  // 사용자 정보 가져오기 메소드
  getUserInfo(userId: number): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/users/${userId}`);
  }

  // 쿠키에서 JWT 토큰 추출
  private extractToken(): string | null {
    return this.getCookie('Authorization');
  }

  // 토큰에서 사용자 ID 추출
  getUserIdFromToken(): number | null {
    const token = this.extractToken();
    if (token) {
      const decodedToken: { userId: number } = jwtDecode(token);
      return decodedToken.userId || null;
    }
    return null;
  }

  // 로그인 상태 확인 메소드
  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable(); // Observable로 반환하여 subscribe 가능
  }

  // 쿠키에서 특정 이름의 값 추출
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ').find(row => row.startsWith(name));
    return cookies ? cookies.split('=')[1] : null;
  }

  // 쿠키 삭제
  private clearCookies(): void {
    document.cookie = 'Authorization=; Max-Age=0; path=/';
    this.user = null;
  }
}
