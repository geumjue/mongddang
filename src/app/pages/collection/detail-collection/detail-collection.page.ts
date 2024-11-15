import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-detail-collection',
  templateUrl: './detail-collection.page.html',
  styleUrls: ['./detail-collection.page.scss'],
})
export class DetailCollectionPage implements OnInit {
  username: string | null = null;
  collection: { 
    name: string; 
    movies: { 
      id: number; 
      title: string; 
      posterUrl: string; // posterUrl 추가
    }[] 
  } | null = null; 

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient // HttpClient 주입
  ) {}

  ngOnInit() {
    this.loadUserName();
    this.loadCollection(); // 컬렉션 로드 추가
  }

  loadUserName() {
    const email = this.getUserEmailFromToken();
    if (email) {
      this.userService.getUserByEmail(email).subscribe({
        next: (user: GetUserResponseData) => {
          this.username = user.username;
          console.log('사용자 이름:', this.username);
        },
        error: (err) => {
          console.error('사용자 정보를 가져오는 중 오류:', err);
        },
        complete: () => {
          console.log('사용자 이름 로드 완료.');
        },
      });
    } else {
      console.warn('토큰에서 이메일을 추출할 수 없습니다.');
    }
  }

  loadCollection() {
    const collectionId = 1; // 실제 필요한 컬렉션 ID로 대체
    this.http
      .get<{ 
        name: string; 
        movies: { 
          id: number; 
          title: string; 
          posterUrl: string; // posterUrl 추가
        }[] 
      }>(`http://localhost:3000/api/collections/${collectionId}`)
      .subscribe({
        next: (data) => {
          this.collection = data; // API 응답 데이터를 collection에 저장
          console.log('컬렉션 로드 완료:', this.collection);
        },
        error: (err) => {
          console.error('컬렉션 데이터를 가져오는 중 오류 발생:', err);
        },
      });
  }

  private getUserEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.email;
    }
    return null;
  }
}