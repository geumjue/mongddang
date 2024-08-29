import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {}

  // 현재 로그인 상태를 확인하는 메서드
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  // 사용자를 로그인 상태로 설정하는 메서드
  login(): void {
    this.loggedIn.next(true);
  }

  // 사용자를 로그아웃 상태로 설정하는 메서드
  logout(): void {
    this.loggedIn.next(false);
  }

  // 상태 변경을 관찰할 수 있는 Observable을 제공하는 메서드
  getLoginStatus() {
    return this.loggedIn.asObservable();
  }
}
