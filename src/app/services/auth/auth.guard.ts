import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // AuthService의 경로를 확인하세요

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // 로그인 상태이면 라우팅 허용
    } else {
      this.router.navigate(['/auth/login']); // 로그인 페이지로 리다이렉트
      return false;
    }
  }
}
