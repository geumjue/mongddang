// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-tab3',
//   templateUrl: 'tab3.page.html',
//   styleUrls: ['tab3.page.scss']
// })
// export class Tab3Page {
//
//   constructor() {}
//
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService} from "../services/auth.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}


  // 로그인 버튼 클릭 시 실행
  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response: { token: string }) => {  // response 타입 지정
          console.log('로그인 성공:', response);
          // 로그인 성공 시 토큰 저장 또는 페이지 이동 처리
        },
        (error: any) => {  // error 타입 지정 (보통 any로 둡니다)
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
  }
}



