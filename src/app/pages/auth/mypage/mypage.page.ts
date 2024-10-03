// src/app/mypage/mypage.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {
  nickname: string | undefined;
  email: string | undefined;
  isLoggedIn: boolean = false; // 로그인 상태 프로퍼티 추가

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn(); // 로그인 상태 확인

    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.authService.getUserInfo(userId).subscribe(
        (response: AuthResponse) => {
          if (response && response.data) {
            this.nickname = response.data.user.nickname;
            this.email = response.data.user.email;
          } else {
            console.error('Invalid response format:', response);
          }
        },
        (error) => {
          console.error('Error fetching user info:', error);
        }
      );
    } else {
      console.error('User ID is not available from token');
    }
  }

  logout() {
    this.authService.logOut();
    console.log('User logged out');
    this.router.navigate(['/tabs/tab3']);
  }
}
