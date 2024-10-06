import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/common/api-response.interface';
import { CommentWithUserResponseData } from '../../models/comment/comment-with-user-response-data.interface';
import { CommentPaginatedResponse } from 'src/app/models/comment/comment-paginated-response-data.interface';
import {CommentWriteResponseData} from "../../models/comment/comment-write-response-data";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) { }

  // // 모든 댓글 조회
  // getAllComments(): Observable<ApiResponse<CommentWithUserResponseData[]>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.get<ApiResponse<CommentWithUserResponseData[]>>(`${this.apiUrl}/comments`, { headers, withCredentials: true });
  // }
  //
  // // 페이징 처리된 댓글 조회
  // getPaginatedComments(page: number, limit: number): Observable<ApiResponse<CommentPaginatedResponse>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.get<ApiResponse<CommentPaginatedResponse>>(`${this.apiUrl}/paginated?page=${page}&limit=${limit}`, { headers, withCredentials: true });
  // }
  //
  // // 특정 댓글 조회
  // getCommentById(id: number): Observable<ApiResponse<CommentWithUserResponseData>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.get<ApiResponse<CommentWithUserResponseData>>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  // }
  //
  // // 댓글 작성
  // writeComment(commentRequestDto: any): Observable<ApiResponse<CommentWithUserResponseData>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<ApiResponse<CommentWithUserResponseData>>(`${this.apiUrl}/comments`, commentRequestDto, { headers, withCredentials: true });
  // }
  //
  // // 댓글 업데이트
  // updateComment(id: number, commentRequestDto: any): Observable<ApiResponse<CommentWithUserResponseData>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put<ApiResponse<CommentWithUserResponseData>>(`${this.apiUrl}/comments${id}`, commentRequestDto, { headers, withCredentials: true });
  // }
  //
  // // 댓글 삭제
  // deleteComment(id: number): Observable<ApiResponse<void>> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/comments${id}`, { headers, withCredentials: true });
  // }

  //영화 코멘트 작성
  postCommentById(username:string,content:string,movieId:string): Observable<CommentWriteResponseData>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CommentWriteResponseData>(
      `${this.apiUrl}/write`,
      { username, content, movieId },
      { headers, withCredentials: true }
    );
  }

}
