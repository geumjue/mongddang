import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FavoriteRequestData } from "src/app/models/favorite/favorite-request.data";
import { FavoriteResponseData, ShowFavoriteByIdResponseData, ShowFavoritesResponseData } from "src/app/models/favorite/favorite-response.data";

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly apiUrl = 'http://localhost:3000/api/favourites';

  constructor(private http: HttpClient) {}

  // 즐겨찾기 추가
  addFavorite(movie: FavoriteRequestData): Observable<FavoriteResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FavoriteResponseData>(`${this.apiUrl}/add`, movie, { headers });
  }

  // 즐겨찾기 삭제
  removeFavorite(id: number): Observable<FavoriteResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<FavoriteResponseData>(`${this.apiUrl}/remove/${id}`, { headers });
  }

  // 사용자 즐겨찾기 조회
  getUserFavorites(userId: number): Observable<ShowFavoritesResponseData[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ShowFavoritesResponseData[]>(`${this.apiUrl}/show/${userId}`, { headers });
  }

  // 즐겨찾기 상세 조회
  getFavoriteById(id: number): Observable<ShowFavoriteByIdResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ShowFavoriteByIdResponseData>(`${this.apiUrl}/show/detail/${id}`, { headers });
  }
}
