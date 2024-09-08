import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // 로그인 버튼 클릭 시 실행
  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response: { token: string }) => {
          console.log('로그인 성공:', response);
          // 로그인 성공 시 토큰을 로컬 스토리지에 저장
          localStorage.setItem('authToken', response.token);
          // 홈 페이지로 이동
          this.router.navigate(['/tab1']);  // 'home' 페이지는 예시입니다. 실제 경로에 맞게 수정하세요.
        },
        (error: any) => {
          console.error('로그인 실패:', error);
        }
      );
    } else {
      console.error('이메일과 비밀번호를 입력하세요.');
    }
  }

  goToCreateAccountPage() {
    console.log('회원가입 페이지로 이동');
    // 예: 회원가입 페이지로 네비게이션
    this.router.navigate(['/create-account']);  // 'signup' 페이지는 예시입니다. 실제 경로에 맞게 수정하세요.
  }
}
