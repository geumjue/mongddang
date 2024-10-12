import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';
  public user: { username: string; email: string } | null = null;

  // BehaviorSubject to manage login status
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  // Expose login status as an observable
  getLoginStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  // Sign up method
  signUp(data: SignUpRequestData): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data, { headers }).pipe(
      catchError(error => {
        console.error('Signup error:', error);
        return of({
          success: false,
          data: null,
          statusCode: error.status,
          message: error.message,
        } as AuthResponse);
      })
    );
  }

  // Login method
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
          // Store the token received from the response
          localStorage.setItem('token', response.data.token); // 'token'에서 JWT 가져오기
          this.loggedInSubject.next(true); // Update login status
          this.router.navigate(['/mypage']); // Redirect to mypage on successful login
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({
          success: false,
          data: null,
          statusCode: error.status,
          message: error.message,
        } as AuthResponse);
      })
    );
  }

  // Logout method
  logOut(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearToken();
        this.user = null; // Reset user data on logout
        this.loggedInSubject.next(false); // Update login status
      }),
      catchError(error => {
        console.error('Logout error:', error);
        return of({});
      })
    );
  }

  // Method to check if user is logged in
  public isLoggedIn(): boolean {
    return !!this.extractToken();
  }

  // Method to extract token from local storage
  private extractToken(): string | null {
    return localStorage.getItem('token');
  }

  // Method to clear token from local storage
  private clearToken(): void {
    localStorage.removeItem('token'); // Clear token from local storage
    this.user = null; // Reset user data
  }
}
