// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-mypage-tab5',
//   templateUrl: './mypage-tab5.page.html',
//   styleUrls: ['./mypage-tab5.page.scss'],
// })
// export class MypageTab5Page implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
//
// }
//
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';  // AuthService를 임포트
import { Router } from '@angular/router';  // Router를 임포트

@Component({
  selector: 'app-mypage-tab5',
  templateUrl: './mypage-tab5.page.html',
  styleUrls: ['./mypage-tab5.page.scss'],
})
export class MypageTab5Page implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }  // AuthService와 Router를 의존성 주입

  ngOnInit() {
  }

  logout() {
    this.authService.logout(); // 로그아웃 상태로 설정
    console.log('User logged out');
    this.router.navigate(['/tabs/tab3']); // 로그아웃 후 로그인 페이지로 라우팅
  }
}

