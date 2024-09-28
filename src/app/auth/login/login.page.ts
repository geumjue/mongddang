import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SignInRequestData } from '../models/auth-signin-request-data.interface';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // 로그인 버튼 클릭 시 실행
  login() {
    const signInRequestData: SignInRequestData = {
      email: this.email,
      password: this.password,
    };

    this.authService.logIn(signInRequestData).subscribe({
      next: response => {
        if (response.success) {
          this.router.navigate(['/']);
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
    // 예: 회원가입 페이지로 네비게이션
    this.router.navigate(['/create-account']);  // 'signup' 페이지는 예시입니다. 실제 경로에 맞게 수정하세요.
  }
}
