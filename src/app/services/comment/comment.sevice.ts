import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../../models/common/api-response.interface';
import { CommentWithUserResponseData } from '../../models/comment/comment-with-user-response-data.interface';
import { CommentPaginatedResponse } from 'src/app/models/comment/comment-paginated-response-data.interface';
import { CommentWriteResponseData } from "../../models/comment/comment-write-response-data";
import { CommentListResponseData } from "../../models/comment/comment-list-response-data";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = 'http://localhost:3000/api/comments';
  private newCommentSubject = new BehaviorSubject<CommentListResponseData | null>(null);

  constructor(private http: HttpClient) { }

  // 코멘트를 서버에 추가하는 메서드
  addComment(comment: CommentListResponseData): Observable<CommentListResponseData> {
    return this.http.post<CommentListResponseData>(this.apiUrl, comment);
  }

  // 새로운 코멘트를 설정하는 메서드
  setNewComment(comment: CommentListResponseData) {
    this.newCommentSubject.next(comment);
  }

  // 새로운 코멘트를 가져오는 Observable
  getNewComment(): Observable<CommentListResponseData | null> {
    return this.newCommentSubject.asObservable();
  }

  clearNewComment() {
    this.newCommentSubject.next(null);
  }

  // 모든 댓글 조회
  getAllComments(): Observable<ApiResponse<CommentWithUserResponseData[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<CommentWithUserResponseData[]>>(
      `${this.apiUrl}/show`,
      { headers, withCredentials: true }
    );
  }

  // 페이징 처리된 댓글 조회
  getPaginatedComments(page: number, limit: number): Observable<ApiResponse<CommentPaginatedResponse>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<CommentPaginatedResponse>>(
      `${this.apiUrl}/show?page=${page}&limit=${limit}`,
      { headers, withCredentials: true }
    );
  }

  // 특정 댓글 조회
  getCommentById(id: number): Observable<ApiResponse<CommentWithUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<CommentWithUserResponseData>>(
      `${this.apiUrl}/show/detail/${id}`,
      { headers, withCredentials: true }
    );
  }

  // 댓글 작성
  writeComment(commentRequestDto: any): Observable<ApiResponse<CommentWithUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ApiResponse<CommentWithUserResponseData>>(
      `${this.apiUrl}/add`,
      commentRequestDto,
      { headers, withCredentials: true }
    );
  }

  // 댓글 업데이트
  updateComment(id: number, commentRequestDto: any): Observable<ApiResponse<CommentWithUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ApiResponse<CommentWithUserResponseData>>(
      `${this.apiUrl}/update/${id}`,
      commentRequestDto,
      { headers, withCredentials: true }
    );
  }

  // 댓글 삭제
  deleteComment(id: number): Observable<ApiResponse<void>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/remove/${id}`,
      { headers, withCredentials: true }
    );
  }

  // 영화 코멘트 작성 (extra functionality if required)
  postCommentById(userId: number, commentContent: string, movieId: number): Observable<CommentWriteResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CommentWriteResponseData>(
      `${this.apiUrl}/add`,
      { userId, commentContent, movieId },
      { headers, withCredentials: true }
    );
  }

  // 특정 영화의 댓글 조회
  getCommentsByMovieId(movieId: number): Observable<CommentListResponseData[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<CommentListResponseData[]>(
      `${this.apiUrl}/movie/${movieId}`, // 엔드포인트 URL 확인 필요
      { headers, withCredentials: true }
    );
  }

  // 좋아요 상태 토글
  toggleFavoriteComment(commentId: number, isFavorite: boolean): Observable<ApiResponse<CommentWithUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (isFavorite) {
      // 좋아요 -> DELETE
      return this.http.delete<ApiResponse<CommentWithUserResponseData>>(
        `${this.apiUrl}/${commentId}/favorite`,
        { headers, withCredentials: true }
      );
    } else {
      // 좋아요X -> POST
      return this.http.post<ApiResponse<CommentWithUserResponseData>>(
        `${this.apiUrl}/${commentId}/favorite`,
        {},
        { headers, withCredentials: true }
      );
    }
  }

  // 싫어요 상태 토글
  toggleDislikeComment(commentId: number, isDislike: boolean): Observable<ApiResponse<CommentWithUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (isDislike) {
      // 싫어요 -> DELETE
      return this.http.delete<ApiResponse<CommentWithUserResponseData>>(
        `${this.apiUrl}/${commentId}/dislike`,
        { headers, withCredentials: true }
      );
    } else {
      // 싫어요X -> POST
      return this.http.post<ApiResponse<CommentWithUserResponseData>>(
        `${this.apiUrl}/${commentId}/dislike`,
        {},
        { headers, withCredentials: true }
      );
    }
  }
}
