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
    alert(this.email)
    const signUpRequestData: SignUpRequestData = {
      username: this.username,
      password: this.password,
      email: this.email,
    }

    this.authService.signUp(signUpRequestData).subscribe({
    next: response => {
      if (response.success) {
        console.log('Sign Up successful:', response.data);
        this.router.navigate(['auth']);
      } else {
        console.error('Sign Up failed:', response.message);
      }
    },
    error: err => {
      console.error('Sign Up error:', err);
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
