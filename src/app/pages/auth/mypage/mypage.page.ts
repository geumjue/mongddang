import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';
import { ApiResponse } from 'src/app/models/common/api-response.interface';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import {jwtDecode} from 'jwt-decode'; // JWT 디코딩을 위한 패키지
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth/auth-reponse.interface';


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
    // Observable<boolean>를 subscribe하여 로그인 상태 확인
    this.authService.getLoginStatus().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; // 로그인 상태 업데이트
      if (this.isLoggedIn) {
        this.getUserData(); // 로그인 상태일 때 사용자 데이터 가져오기
      } else {
        console.error('User is not logged in');
      }
    });
  }

  // 로그인 함수 추가
  login(credentials: { email: string, password: string }) {
    this.authService.login(credentials).subscribe((response) => {
      const token = response.token;  // 서버에서 받은 토큰
      if (token) {
        localStorage.setItem('authToken', token);  // 토큰을 저장
        this.router.navigate(['/mypage']);  // 마이페이지로 이동
      } else {
        console.error('Received response does not contain a token');
      }
    }, (error) => {
      console.error('Login failed:', error);
    });
  }



  // JWT 토큰에서 사용자 ID 추출
  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token); // JWT 디코딩
      return decodedToken.id; // 사용자 ID 반환
    }
    return null; // 토큰이 없으면 null 반환
  }

  getUserData() {
    const userId = this.getUserIdFromToken(); // 사용자 ID 가져오기
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (response: ApiResponse<GetUserResponseData>) => { // 응답 타입 지정
          if (response && response.data) {
            this.user = response.data; // 전체 사용자 객체를 할당
            this.username = this.user.username; // 사용자 닉네임
            this.email = this.user.email; // 사용자 이메일
            console.log(this.user);

          } else {
            console.error('Invalid response:', response); // 에러 처리
          }
        },
        (error) => {
          console.error('Error fetching user info:', error); // 에러 처리
        }
      );
    } else {

      console.error('No auth token found or invalid user ID');

    }
  }

  // 로그아웃 메소드
  logout() {

    this.authService.logOut().subscribe(() => { // 로그아웃 후 구독
      console.log('User logged out');
      this.router.navigate(['/home']);
    });

  }
}
