import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';
  public user: { nickname: string; email: string } | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  // 회원가입 메소드
  signUp(data: SignUpRequestData): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data, { headers, withCredentials: true });
  }

  // 로그인 메소드
  logIn(data: SignInRequestData): Observable<AuthResponse> {
    // 이미 로그인 상태라면 마이페이지로 리다이렉트
    if (this.isLoggedIn()) {
      this.router.navigate(['/mypage']);
      return of({
        success: false,
        data: null,
        statusCode: 403,
        message: 'Already logged in',
      } as AuthResponse);
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          // 로그인 성공 시 사용자 정보 저장
          this.user = {
            nickname: response.data.user.nickname,
            email: response.data.user.email,
          };
          this.router.navigate(['/mypage']); // 로그인 성공 시 마이페이지로 리다이렉트
        }
      }),
      // 에러 처리
      catchError(error => {
        return of({
          success: false,
          data: null,
          statusCode: error.status,
          message: error.message,
        } as AuthResponse);
      })
    );
  }

  // 로그아웃 메소드
  logOut(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearCookies();
        this.user = null; // 로그아웃 시 사용자 정보 초기화
      })
    );
  }

  // 사용자 정보 가져오기 메소드
  getUserInfo(userId: number): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/users/${userId}`); // API 엔드포인트 확인
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

  // 로그인 상태 확인
  isLoggedIn(): boolean {
    return !!this.extractToken();
  }

  // 쿠키에서 특정 이름의 값 추출
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ').find(row => row.startsWith(name));
    return cookies ? cookies.split('=')[1] : null;
  }

  // 쿠키 삭제
  private clearCookies(): void {
    document.cookie = 'Authorization=; Max-Age=0; path=/'; // JWT 쿠키 삭제
    this.user = null; // 사용자 정보 초기화
  }
}
