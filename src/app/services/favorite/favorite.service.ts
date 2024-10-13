// favorite.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FavoriteResponseData, ShowFavoritesResponseData } from "src/app/models/favorite/favorite-response.data";

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly apiUrl = 'http://localhost:3000/api/favourites';

  constructor(private http: HttpClient) {}

  // 즐겨찾기 추가
  addFavorite(username: string, movieId: string): Observable<FavoriteResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FavoriteResponseData>(
      `${this.apiUrl}/add`, 
      { username, movieId }, 
      { headers, withCredentials: true }
    );
  }

  // 즐겨찾기 상태 확인
  checkFavorite(username: string, movieId: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<boolean>(`${this.apiUrl}/check/${username}/${movieId}`, { headers });
  }

  // 사용자 즐겨찾기 조회
  getUserFavorites(userId: number): Observable<ShowFavoritesResponseData[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ShowFavoritesResponseData[]>(`${this.apiUrl}/show/${userId}`, { headers });
  }

  // ...
}
