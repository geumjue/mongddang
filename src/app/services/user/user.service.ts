import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/common/api-response.interface';
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';
import {jwtDecode} from 'jwt-decode'; // JWT 디코딩을 위한 패키지

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/user'; // NestJS API URL

    constructor(private http: HttpClient) {}

    // JWT 토큰에서 사용자 ID 추출
    private getUserIdFromToken(): string | null {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken: any = jwtDecode(token); // JWT 디코딩
            return decodedToken.id; // 사용자 ID 반환
        }
        return null; // 토큰이 없으면 null 반환
    }

    // 현재 로그인한 사용자의 데이터 가져오기
    getUserData(): Observable<ApiResponse<GetUserResponseData>> {
        const userId = this.getUserIdFromToken(); // 사용자 ID 가져오기
        if (userId) {
            const token = localStorage.getItem('authToken'); // 토큰 불러오기
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`, // 헤더에 토큰 추가
                'Content-Type': 'application/json'
            });

            return this.http.get<ApiResponse<GetUserResponseData>>(`${this.apiUrl}/${userId}`, { headers, withCredentials: true });
        } else {
            throw new Error('No auth token found or invalid user ID');
        }
    }

    // 사용자 ID로 사용자 정보 가져오기
    getUserById(userId: string): Observable<ApiResponse<GetUserResponseData>> {
        const token = localStorage.getItem('authToken'); // 토큰 불러오기
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`, // 헤더에 토큰 추가
            'Content-Type': 'application/json'
        });

        return this.http.get<ApiResponse<GetUserResponseData>>(`${this.apiUrl}/${userId}`, { headers, withCredentials: true });
    }

    // 사용자 정보 수정하기
    updateUser(userId: string, formData: FormData): Observable<ApiResponse<GetUserResponseData>> {
        const headers = new HttpHeaders({
            'enctype': 'multipart/form-data'
        });
        return this.http.put<ApiResponse<GetUserResponseData>>(`${this.apiUrl}/${userId}`, formData, { headers, withCredentials: true });
    }

    // 사용자 탈퇴하기
    deleteUser(userId: string): Observable<ApiResponse<void>> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // JWT 토큰
            'Content-Type': 'application/json'
        });
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${userId}`, { headers, withCredentials: true });
    }
}
