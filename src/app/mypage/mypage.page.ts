import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';  // AuthService를 임포트
import { Router } from '@angular/router';  // Router를 임포트

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }  // AuthService와 Router를 의존성 주입

  ngOnInit() {
  }

  logout() {
    this.authService.logout(); // 로그아웃 상태로 설정
    console.log('User logged out');
    this.router.navigate(['/tabs/tab3']); // 로그아웃 후 로그인 페이지로 라우팅
  }
}
