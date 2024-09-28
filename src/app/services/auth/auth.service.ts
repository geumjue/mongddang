import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // 회원가입 메소드
  signUp(data: SignUpRequestData): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data, { headers, withCredentials: true });
  }

  // 로그인 메소드
  logIn(data: SignInRequestData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    });
  }

  // 로그아웃 메소드
  logOut(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearCookies();
      })
    );
  }

  // 로그인 상태 및 사용자 ID 가져오기 (Observable로 변경)
  // getLoginStatus(): Observable<{ isLoggedIn: boolean; userId: number | null }> {
  //   const isLoggedIn = this.isLoggedIn();
  //   const userId = this.getUserIdFromToken();
  //   return of({ isLoggedIn, userId });
  // }

  // 쿠키에서 JWT 토큰 추출
  private extractToken(): string | null {
    return this.getCookie('Authorization');
  }

  // 토큰에서 사용자 ID 추출
  getUserIdFromToken(): number | null {
    const token = this.extractToken();
    if (token) {
      const { userId } = jwtDecode(token) as any;
      return userId || null;
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
    // 필요한 경우 다른 쿠키도 삭제 가능
  }
}
