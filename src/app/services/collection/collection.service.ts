import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  PostCollectionRequestData,
  PostCollectionResponseData
} from "../../models/collection/collection-postcollection.interface.data";
import {GetCollectionsResponseData} from "../../models/collection/collection-getcollections.interface.data";
import {
  UpdateCollectionRequestData,
  UpdateCollectionResponseData
} from "../../models/collection/collection-updatecollection.interface.data";

@Injectable({
  providedIn:'root'
})
export class CollectionService {
  private readonly apiUrl ='http://localhost:3000/api/collections';

  constructor(private http: HttpClient) {
  }

  // 컬렉션 생성
  createCollection(payload: PostCollectionRequestData): Observable<PostCollectionResponseData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PostCollectionResponseData>(`${this.apiUrl}`, payload, { headers });
  }

  // 컬렉션 조회
  getCollections() : Observable<GetCollectionsResponseData[]>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get<GetCollectionsResponseData[]>(`${this.apiUrl}`,{headers})
  }

  // 컬렉션 업데이트
  updateCollection(id:number, payload:UpdateCollectionRequestData) :Observable<UpdateCollectionResponseData[]>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put<UpdateCollectionResponseData[]>(`${this.apiUrl}/${id}`,payload,{headers})
  }

 // 컬렉션에 영화 추가
  addMovieToCollection(collectionId: number, movieId: string): Observable<any> {
    const url = `${this.apiUrl}/${collectionId}/movies/${movieId}`; // 백엔드와 맞추기
    return this.http.post<any>(url, {});
  }
}
