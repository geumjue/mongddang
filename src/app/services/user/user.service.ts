import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common/api-response.interface';
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';
import { jwtDecode } from 'jwt-decode'; // JWT 디코딩을 위한 패키지

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user'; // NestJS API URL

  constructor(private http: HttpClient) {}
  getUserById(userId: number): Observable<GetUserResponseData> {
    return this.http.get<GetUserResponseData>(`${this.apiUrl}/${userId}`);
  }
  // JWT 토큰에서 사용자 이메일 추출
  private getUserEmailFromToken(): string | null {
    const token = localStorage.getItem('token'); // 일관된 키 사용
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // JWT 디코딩
        return decodedToken.email; // 사용자 이메일 반환
      } catch (err) {
        console.error('Error decoding token:', err);
        return null;
      }
    }
    console.error('No token found');
    return null; // 토큰이 없으면 null 반환
  }

  // 현재 로그인한 사용자의 데이터 가져오기 (이메일 사용)
  getUserData(): Observable<ApiResponse<GetUserResponseData>> {
    const email = this.getUserEmailFromToken(); // 사용자 이메일 가져오기
    if (email) {
      const token = localStorage.getItem('token'); // 토큰 불러오기
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, // 헤더에 토큰 추가
        'Content-Type': 'application/json'
      });

      return this.http.get<ApiResponse<GetUserResponseData>>(`${this.apiUrl}/email/${email}`, { headers, withCredentials: true });
    } else {
      throw new Error('No auth token found or invalid email');
    }
  }

  // 사용자 이메일로 사용자 정보 가져오기
  getUserByEmail(email: string): Observable<GetUserResponseData> {
    const token = localStorage.getItem('token'); // 일관된 키 사용
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // 헤더에 토큰 추가
      'Content-Type': 'application/json'
    });

    return this.http.get<GetUserResponseData>(`${this.apiUrl}/mypage/${email}`, { headers, withCredentials: true });
  }

  // 사용자 이메일로 사용자 정보 + 좋아요한 영화 가져오기
  getUserWithLikedMovieByEmail(email: string): Observable<GetUserResponseData> {
    const token = localStorage.getItem('token'); // 일관된 키 사용
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // 헤더에 토큰 추가
      'Content-Type': 'application/json'
    });

    return this.http.get<GetUserResponseData>(`${this.apiUrl}/mypage/${email}`, { headers, withCredentials: true });
  }

  // 사용자 정보 수정하기
  updateUser(email: string, formData: FormData): Observable<ApiResponse<GetUserResponseData>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT 토큰
      'enctype': 'multipart/form-data'
    });
    return this.http.put<ApiResponse<GetUserResponseData>>(`${this.apiUrl}/email/${email}`, formData, { headers, withCredentials: true });
  }

  // 사용자 탈퇴하기
  deleteUser(email: string): Observable<ApiResponse<void>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT 토큰
      'Content-Type': 'application/json'
    });
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/email/${email}`, { headers, withCredentials: true });
  }
}
