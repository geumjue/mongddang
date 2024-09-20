// import { Injectable } from '@angular/core';
// import{ HttpClient} from "@angular/common/http";
// import { BehaviorSubject } from 'rxjs';
// import{ Observable} from "rxjs";
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class AuthService {
//   private apiUrl = "http://34.64.110.178:3000/user" //백엔드 api url
//
//   constructor(private http: HttpClient) {}
//
//   // // 현재 로그인 상태를 확인하는 메서드
//   // isLoggedIn(): boolean {
//   //   return this.loggedIn.value;
//   // }
//
//   // 사용자를 로그인 상태로 설정하는 메서드
//   // login(): void {
//   //   this.loggedIn.next(true);
//   // }
//   login(email: string, password: string): Observable<{ token: string }> {
//     const loginData = {
//       email: email,
//       password: password
//     };
//
//     // POST 요청을 보내서 로그인 처리
//     return this.http.post<{ token: string }>(this.apiUrl, loginData);
//   }
//   setLoginStatus(status: boolean) {
//     this.loggedIn.next(status);
//   }
//
//   getLoginStatus(): Observable<boolean> {
//     return this.loggedIn.asObservable();
//   }
//
//   // 사용자를 로그아웃 상태로 설정하는 메서드
//   // logout(): void {
//   //   this.loggedIn.next(false);
//   // }
//   //
//   // // 상태 변경을 관찰할 수 있는 Observable을 제공하는 메서드
//   // getLoginStatus() {
//   //   return this.loggedIn.asObservable();
//   // }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogInRequestData } from '../models/auth-login-request-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // 서버에서 로그인 상태를 확인하는 메서드
  getLoginStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/login-status`);
  }

  // 로그인 요청 메서드
  login(logInRequestData: LogInRequestData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/signin`, logInRequestData, { headers, withCredentials: true });
  }

  // 로그아웃 요청 메서드
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  // 회원가입 요청 메서드
  signUp(username: string, email: string, password: string): Observable<void> {
    const signUpData = { username, email, password };
    return this.http.post<void>(`${this.apiUrl}/signup`, signUpData);
  }

}