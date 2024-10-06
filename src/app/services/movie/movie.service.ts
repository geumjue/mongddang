import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetMoviesResponseData} from "../../models/movie/movie-getmovie-response-data.interface";
import {GetMovieByIdResponseData} from "../../models/movie/movie-getmoviebyid-response-data.interface";

@Injectable({
  providedIn :'root',
})
export class MovieService {
  private readonly apiUrl ='http://localhost:3000/api/movies';

  constructor(private http: HttpClient) {
  }

  // 영화 목록 조회
  getMovies(): Observable<GetMoviesResponseData[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<GetMoviesResponseData[]>(`${this.apiUrl}`, { headers })
  }

  // 영화 조회
  getMovieById(id:string): Observable<GetMovieByIdResponseData>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<GetMovieByIdResponseData>(`${this.apiUrl}/${id}`, { headers})
  }

}
