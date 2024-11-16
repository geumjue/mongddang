import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';
import { AlertController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';
import { CollectionService } from 'src/app/services/collection/collection.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {
  nickname: string | null = null;
  email: string | null = null;
  isLoggedIn: boolean = false;
  user = { username: '', email: '' };
  collections: any[] = [];
  movie: any = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private collectionService: CollectionService,
  ) {}

  ngOnInit() {
    this.authService.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });

    const userId = this.authService.getUserIdFromToken();
    console.log('User ID from token:', userId);

    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.getUserData();
      this.loadCollections();
    } else {
      console.error('사용자가 로그인하지 않았습니다');
      this.router.navigate(['/auth/login']);
    }
  }

  // 사용자 데이터를 가져오는 메서드
  getUserData() {
    const email = this.getUserEmailFromToken();
    if (email) {
      this.userService.getUserByEmail(email).subscribe({
        next: (user: GetUserResponseData) => {
          console.log('User Data:', user);
          this.user = user;
        },
        error: (err) => {
          console.error('사용자 정보를 가져오는 중 오류:', err);
        },
        complete: () => {
          console.log('사용자 정보 요청 완료.');
        }
      });
    } else {
      console.warn('No user ID found in token');
      this.isLoggedIn = false;
    }
  }

  // JWT 토큰에서 이메일을 추출하는 메서드
  private getUserEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken.email;
    }
    return null;
  }

  logout() {
    this.authService.logOut().subscribe({
      next: () => {
        console.log('사용자가 로그아웃되었습니다');
        localStorage.removeItem('token'); // 로그아웃 시 토큰 제거
        this.isLoggedIn = false; // 상태를 로그아웃으로 설정
        this.router.navigate(['/auth/login']); // 로그인 페이지로 이동
      },
      error: (err) => {
        console.error('로그아웃 중 오류 발생:', err);
      }
    });
  }

  // 로그아웃 확인 알림 표시
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: '로그아웃',
      message: '정말로 로그아웃 하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            console.log('로그아웃이 취소되었습니다.');
          }
        },
        {
          text: '로그아웃',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    await alert.present(); // 알림 표시
  }

  goToLikedMoviePage() {
    this.router.navigate(['mypage/liked-movie']);
  }

  goToLikedCollectionPage() {
    this.router.navigate(['mypage/liked-collection']);
  }

  goToLikedCommentPage() {
    this.router.navigate(['mypage/liked-comment']);
  }

  goToDeleteAccount() {
    this.router.navigate(['/delete-account']);
  }

  goToMyCollectionPage () {
    this.router.navigate(['mypage/my-collection'])
  }

  goToCollectionDetail(collectionId: string) {
    this.router.navigate([`/detail-collection/${collectionId}`]);
  }

  loadCollections() {
    this.collectionService.getCollections().subscribe((data) => {
      this.collections = data.map((collection) => ({
        ...collection,
        movie: collection.movies?.[0] || null,
      }));
    });
  }
  
}
