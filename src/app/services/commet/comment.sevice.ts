import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/common/api-response.interface';
import { CommentWithUserResponseData } from '../../models/comment/comment-with-user-response-data.interface';
import { CommentPaginatedResponse } from 'src/app/models/comment/comment-paginated-response-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api/comments'; // 댓글 API URL

  constructor(private http: HttpClient) { }

  // 모든 댓글 가져오기
  getAllComments(): Observable<ApiResponse<CommentWithUserResponseData[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<CommentWithUserResponseData[]>>(`${this.apiUrl}`, { headers, withCredentials: true });
  }

  // 페이지네이션된 댓글 가져오기
  getPaginatedComments(page: number, limit: number): Observable<ApiResponse<CommentPaginatedResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<CommentPaginatedResponse>>(`${this.apiUrl}/paginated?page=${page}&limit=${limit}`, { headers, withCredentials: true });
  }

  // 댓글 ID로 댓글 가져오기
  getCommentById(id: number): Observable<ApiResponse<CommentWithUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<CommentWithUserResponseData>>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  }

  // 댓글 작성하기
  writeComment(formData: FormData): Observable<ApiResponse<CommentWithUserResponseData>> {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post<ApiResponse<CommentWithUserResponseData>>(`${this.apiUrl}`, formData, { headers, withCredentials: true });
  }

  // 댓글 수정하기
  updateComment(id: number, formData: FormData): Observable<ApiResponse<CommentWithUserResponseData>> {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.put<ApiResponse<CommentWithUserResponseData>>(`${this.apiUrl}/${id}`, formData, { headers, withCredentials: true });
  }

  // 댓글 삭제하기
  deleteComment(id: number): Observable<ApiResponse<void>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  }
}
