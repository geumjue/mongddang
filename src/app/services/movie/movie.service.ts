import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/common/api-response.interface';
import { MovieWithUserResponseData } from '../../models/movie/movie-with-user-response-data.interface';
import { MovieWithAttachmentUserResponseData } from '../../models/movie/movie-with-attachment-user-response-data.interface';
import { MoviePaginatedResponseData } from '../../models/movie/movie-paginated-response-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient) { }

  // 모든 영화 조회
  getAllMovies(): Observable<ApiResponse<MovieWithUserResponseData[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<MovieWithUserResponseData[]>>(this.apiUrl, { headers, withCredentials: true });
  }

  // 페이징 처리된 영화 조회
  getPaginatedMovies(page: number, limit: number): Observable<ApiResponse<MoviePaginatedResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<MoviePaginatedResponseData>>(`${this.apiUrl}/paginated?page=${page}&limit=${limit}`, { headers, withCredentials: true });
  }

  // 특정 영화 조회
  getMovieById(id: number): Observable<ApiResponse<MovieWithAttachmentUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<MovieWithAttachmentUserResponseData>>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  }

  // 영화 작성
  createMovie(movie: MovieWithAttachmentUserResponseData): Observable<ApiResponse<MovieWithAttachmentUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ApiResponse<MovieWithAttachmentUserResponseData>>(this.apiUrl, movie, { headers, withCredentials: true });
  }

  // 영화 업데이트
  updateMovie(id: number, movie: MovieWithAttachmentUserResponseData): Observable<ApiResponse<MovieWithAttachmentUserResponseData>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ApiResponse<MovieWithAttachmentUserResponseData>>(`${this.apiUrl}/${id}`, movie, { headers, withCredentials: true });
  }

  // 영화 삭제
  deleteMovie(id: number): Observable<ApiResponse<void>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`, { headers, withCredentials: true });
  }

  // 영화 검색
  searchMovies(title: string): Observable<ApiResponse<MovieWithUserResponseData[]>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<MovieWithUserResponseData[]>>(`${this.apiUrl}/search?title=${title}`, { headers, withCredentials: true });
  }

  // 필터링된 영화 조회
  filterMovies(genre?: string, directorId?: number, actor?: string): Observable<ApiResponse<MovieWithUserResponseData[]>> {
    let query = `${this.apiUrl}/filter?`;
    if (genre) query += `genre=${genre}&`;
    if (directorId) query += `directorId=${directorId}&`;
    if (actor) query += `actor=${actor}&`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<MovieWithUserResponseData[]>>(query, { headers, withCredentials: true });
  }
}
