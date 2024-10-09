import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {

  nickname: string | null = null; // 사용자 닉네임
  email: string | null = null; // 사용자 이메일
  isLoggedIn: boolean = false; // 로그인 상태를 나타내는 변수

  username: string | null = null; // 사용자 이름 추가

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // 로그인 상태 구독
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status; // 로그인 상태 업데이트
    });

    // 사용자 ID 가져오기
    const userId = this.authService.getUserIdFromToken(); 
    console.log('User ID from token:', userId); // 디버깅용 로그

    if (userId) {
      // 사용자 정보 요청
      this.authService.getUserInfo(userId).subscribe(
        (response: AuthResponse) => {
          console.log('User info response:', response); // API 응답 확인
          if (response.success && response.data) {
            this.nickname = response.data.user.nickname; // 닉네임 저장
            this.email = response.data.user.email; // 이메일 저장
            this.username = response.data.user.username; // 사용자 이름 저장 추가
          } else {
            console.error('Invalid response:', response); // 에러 처리
          }
        },
        (error) => {
          console.error('Error fetching user info:', error); // 에러 처리
        }
      );
    } else {
      console.warn('No user ID found in token'); // 경고 메시지
      this.isLoggedIn = false; // 로그인 상태 설정
    }
  }

  // 로그아웃 메소드
  logout() {
    this.authService.logOut().subscribe(() => {
      this.isLoggedIn = false; // 로그아웃 후 로그인 상태 변경
      this.router.navigate(['/']); // 로그아웃 후 홈으로 리다이렉트
    });
  }

  // 로그인 페이지로 이동하는 메소드
  goToLogin() {
    this.router.navigate(['/login']); // 로그인 페이지로 이동
  }
}
