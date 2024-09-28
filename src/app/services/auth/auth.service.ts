import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}
// 회원가입 메소드
  signUp(data: FormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data, { withCredentials: true });
  }
//로그인 메소드
  logIn(data: SignInRequestData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    });
  }
//쿠키에서 JWt 토큰 추출
  private extractToken(): string | null {
    return this.getCookie('Authorization');
  }
//토큰에서 사용자 ID 추출
  getUserIdFromToken(): number | null {
    const token = this.extractToken();
    if (token) {
      const { userId } = jwtDecode(token) as any;
      return userId || null;
    }
    return null;
  }
//로그인 상태 확인
  isLoggedIn(): boolean {
    return !!this.extractToken();
  }
//토큰에서 프로필 사진 URL 추출
  getUserProfilePictureFromToken(): string | null {
    const token = this.extractToken();
    if (token) {
      const { profilePictureUrl } = jwtDecode(token) as any;
      return profilePictureUrl || null;
    }
    return null;
  }
//쿠키에서 특정 이름의 값 추출
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ').find(row => row.startsWith(name));
    return cookies ? cookies.split('=')[1] : null;
  }
}
