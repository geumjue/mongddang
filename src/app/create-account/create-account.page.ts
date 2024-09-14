import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ AuthService } from "../services/auth.service";


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  nickname: string = '';
  email: string ='';
  password:string='';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  signUp() {
    if (this.nickname && this.email && this.password) {
      this.authService.signUp(this.nickname, this.email, this.password).subscribe(
        () => {
          console.log('회원가입 성공');
          this.router.navigate(['/tabs/tab3']); // 회원가입 후 첫 번째 탭으로 이동
        },
        (error) => {
          console.error('회원가입 실패:', error);
        }
      );
    } else {
      console.error('모든 필드를 입력하세요.');
    }
  }

  goBackLoginPage() {
    this.router.navigate(['/tabs/tab3']); // 로그인 페이지로 이동합니다

  }
}
