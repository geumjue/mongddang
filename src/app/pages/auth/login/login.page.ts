import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';
import { SignInRequestData } from 'src/app/models/auth/auth-signin-request-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // 이메일과 비밀번호가 입력되었는지 확인
    if (!this.email || !this.password) {
      console.error('이메일 또는 비밀번호가 입력되지 않았습니다.');
      return; // 입력이 없으면 로그인 요청을 하지 않음
    }

    const signInRequestData: SignInRequestData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(signInRequestData).subscribe({
      next: (response: AuthResponse) => {
        const token = response.data?.token; // token 속성으로 접근
        if (token) {
          // 로그인 성공 시 마이페이지로 이동
          localStorage.setItem('authToken', token); // 토큰 저장
          this.router.navigate(['/mypage']);
        } else {
          console.error('로그인 실패: 토큰이 없습니다.');
        }
      },
      error: err => {
        console.error('로그인 오류:', err);
      },
      complete: () => {
        console.log('로그인 요청 완료.');
      }
    });
  }

  goToCreateAccountPage() {
    console.log('회원가입 페이지로 이동');
    this.router.navigate(['auth/create-account']);
  }
}
