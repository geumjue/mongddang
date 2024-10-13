import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {
  nickname: string | null = null;
  email: string | null = null;
  isLoggedIn: boolean = false;
  
  // user 속성 추가
  user = { username: '', email: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });

    const userId = this.authService.getUserIdFromToken();
    console.log('User ID from token:', userId);

    if (userId) {
      this.authService.getUserInfo(userId).subscribe(
        (response) => { // 타입 명시
          console.log('User info response:', response);
          if (response && response.success && response.data) {
            this.nickname = response.data.user.username;
            this.email = response.data.user.email;
            // user 속성 사용
            this.user.username = response.data.user.username;
            this.user.email = response.data.user.email;
          } else {
            console.error('Invalid response:', response);
          }
        },
        (error) => { // 타입 명시
          console.error('Error fetching user info:', error);
        }
      );
    } else {
      console.warn('No user ID found in token');
      this.isLoggedIn = false;
    }
  }

  logout() {
    this.authService.logOut().subscribe(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToDeleteAccount() {
    this.router.navigate(['/delete-account']);
  }

  // 추가된 메서드들
  goToLikedMoviePage() {}
  
  goToLikedCollectionPage() {}
  
  goToLikedCommentPage() {}
}