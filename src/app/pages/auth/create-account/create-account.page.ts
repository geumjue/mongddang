import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpRequestData } from 'src/app/models/auth/auth-signup-request-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  signUp() {
    const signUpRequestData: SignUpRequestData = {
      username: this.username,
      password: this.password,
      email: this.email,
    };

    this.authService.signUp(signUpRequestData).subscribe({
      next: response => {
        if (response.success) {
          console.log('Sign Up successful:', response.data);
          alert('회원가입이 완료되었습니다.'); // 회원가입 완료 메시지
          this.router.navigate(['auth']); // 로그인 화면으로 리다이렉트
        } else {
          console.error('Sign Up failed:', response.message);
          alert('회원가입에 실패했습니다: ' + response.message); // 실패 메시지
        }
      },
      error: err => {
        console.error('Sign Up error:', err);
        if (err.error && err.error.statusCode === 409) {
          alert('회원가입에 실패했습니다: 이메일이 이미 존재합니다.'); // 이메일 중복 메시지
        } else {
          alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'); // 일반 오류 메시지
        }
      },
      complete: () => {
        console.log('Sign Up request completed.');
      }
    });
  }

  goBackLoginPage() {
    this.router.navigate(['/tabs/login']); // 로그인 페이지로 이동합니다
  }
}
