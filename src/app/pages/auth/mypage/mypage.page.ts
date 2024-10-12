import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';
import { ApiResponse } from 'src/app/models/common/api-response.interface';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { jwtDecode } from 'jwt-decode'; // JWT 디코딩을 위한 올바른 import

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {
  username: string = ''; // 기본값 설정
  email: string = ''; // 기본값 설정
  isLoggedIn: boolean = false;

  user = {
    id: "",              // 사용자 ID
    username: "",        // 사용자 이름
    email: "",           // 사용자 이메일
    createdAt: "",       // 가입일
    modifiedAt: ""       // 수정일
  };

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    addIcons({ personCircle });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.getUserData();
    } else {
      console.error('User is not logged in');
      this.router.navigate(['/login']); // 로그인 페이지로 리디렉션
    }
  }

  // JWT 토큰에서 사용자 이메일 추출
  private getUserEmailFromToken(): string | null {
    const token = localStorage.getItem('token'); // 'authToken'에서 'token'으로 수정
    if (token) {
      const decodedToken: any = jwtDecode(token); // JWT 디코딩
      return decodedToken.email; // 사용자 이메일 반환
    }
    return null; // 토큰이 없으면 null 반환
  }

  // 현재 사용자 데이터 가져오기
  getUserData() {
    const email = this.getUserEmailFromToken(); // 사용자 이메일 가져오기
    if (email) {
      this.userService.getUserByEmail(email).subscribe(
        (response: ApiResponse<GetUserResponseData>) => {
          if (response && response.data) {
            this.user = response.data; // 전체 사용자 객체를 할당
            this.username = this.user.username; // 사용자 닉네임
            this.email = this.user.email; // 사용자 이메일
            console.log(this.user);
          } else {
            console.error('Invalid response format:', response);
          }
        },
        (error) => {
          console.error('Error fetching user info:', error);
        }
      );
    } else {
      console.error('No auth token found or invalid email');
    }
  }

  logout() {
    this.authService.logOut().subscribe(() => { // 로그아웃 후 구독
      console.log('User logged out');
      this.router.navigate(['/']);
    });
  }
}
