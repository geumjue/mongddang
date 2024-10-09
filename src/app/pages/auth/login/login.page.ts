import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
      next: response => {
        if (response.success) {
          // 로그인 성공 시 마이페이지로 이동
          this.router.navigate(['/mypage']);
        } else {
          console.error('Sign In failed:', response.message);
        }
      },
      error: err => {
        console.error('Sign In error:', err);
      },
      complete: () => {
        console.log('Sign In request completed.');
      }
    });
  }

  goToCreateAccountPage() {
    console.log('회원가입 페이지로 이동');
    this.router.navigate(['auth/create-account']);
  }
}
