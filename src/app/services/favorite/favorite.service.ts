import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FavoriteCollectionRequestData, FavoriteRequestData, ShowFavoriteCollectionsResponseData } from "src/app/models/favorite/favorite-request.data";
import { FavoriteResponseData, ShowFavoriteByIdResponseData, ShowFavoritesResponseData,  } from "src/app/models/favorite/favorite-response.data";
import { CheckFavoriteResponseData } from "src/app/models/favorite/checkfavorite-response.data";

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly apiUrl = 'http://localhost:3000/api/favorite';  // 엔드포인트 설정

  constructor(private http: HttpClient) { }

  // 즐겨찾기 추가
  addFavorite(favoriteRequestData: FavoriteRequestData): Observable<FavoriteResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FavoriteResponseData>(
      `${this.apiUrl}/add`,
      favoriteRequestData,  // 요청 데이터를 FavoriteRequestData로 전달
      { headers, withCredentials: true }
    );
  }

  // 즐겨찾기 삭제
  removeFavorite(userId: number, movieId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${userId}/${movieId}`, {
      withCredentials: true
    });
  }

  // 사용자 즐겨찾기 조회
  getUserFavorites(userId: number): Observable<ShowFavoritesResponseData[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ShowFavoritesResponseData[]>(`${this.apiUrl}/show/${userId}`, { headers });
  }

  // ID로 특정 즐겨찾기 조회
  getFavoriteById(id: number): Observable<ShowFavoriteByIdResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ShowFavoriteByIdResponseData>(`${this.apiUrl}/show/detail/${id}`, { headers });
  }

  // 사용자와 영화에 대한 즐겨찾기 여부 확인
  checkIfFavorited(userId: number, movieId: number): Observable<CheckFavoriteResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<CheckFavoriteResponseData>(`${this.apiUrl}/check/${userId}/${movieId}`, { headers });
  }

  // 컬렉션 즐겨찾기 추가
  addFavoriteCollection(favoriteCollectionRequestData: FavoriteCollectionRequestData): Observable<FavoriteResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FavoriteResponseData>(
      `${this.apiUrl}/add-collection`,  // 엔드포인트를 추가해야 할 수도 있어
      favoriteCollectionRequestData,
      { headers, withCredentials: true }
    );
  }

  // 사용자 즐겨찾기 컬렉션 조회
  getUserFavoriteCollections(userId: number): Observable<ShowFavoriteCollectionsResponseData[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ShowFavoriteCollectionsResponseData[]>(`${this.apiUrl}/show/collections/${userId}`, { headers });
  }
}
