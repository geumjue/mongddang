import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError, BehaviorSubject } from 'rxjs';
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';
  public user: { username: string; email: string } | null = null;


  // 로그인 상태를 관리하는 BehaviorSubject

  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}


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
            username: response.data.user.username,
            email: response.data.user.email,
          };

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

  private extractToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserIdFromToken(): string | null {
    // 토큰에서 사용자 ID를 추출하는 로직 필요
    return null;
  }

  public getUserInfo(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`).pipe(
      catchError(error => {
        console.error('사용자 정보 가져오기 오류:', error);
        return of(null);
      })
    );

  // 사용자 정보와 토큰을 초기화하는 메서드
  private clearUserData(): void {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
    this.user = null; // 메모리에서 사용자 정보 초기화
  }

  // 사용자가 로그인 상태인지 확인하는 메서드
  public isLoggedIn(): boolean {
    return !!this.extractToken();
  }

  // 로컬 스토리지에서 토큰을 추출하는 메서드
  private extractToken(): string | null {
    return localStorage.getItem('token');
  }
}