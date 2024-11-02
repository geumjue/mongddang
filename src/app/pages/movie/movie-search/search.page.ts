import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetMovieByIdResponseData } from "../../../models/movie/movie-getmoviebyid-response-data.interface";
import { MovieService } from '../../../services/movie/movie.service';
import { GetMoviesResponseData } from '../../../models/movie/movie-getmovie-response-data.interface'; // 영화 데이터 인터페이스 가져오기

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage {
  searchTerm: string = '';
  searchResults: string[] = [];
  data: string[] = []; // 영화 제목 배열
  movie: GetMovieByIdResponseData | undefined; // 선택된 영화 정보를 저장하기 위한 변수

  constructor(private router: Router, private movieService: MovieService) {
    // HomePage에서 전달된 상태를 가져옵니다.
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['movies']) { // 대괄호 표기법 사용
      const movies: GetMoviesResponseData[] = navigation.extras.state['movies']; // 대괄호 표기법 사용
      this.data = movies.map(movie => movie.title); // 영화 제목 배열 초기화
    }
  }

  getMovieById(id: string) {
    this.movieService.getMovieById(id).subscribe({
      next: (response: GetMovieByIdResponseData) => {
        this.movie = response; // 선택된 영화 정보 저장
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchResults = this.data.filter(item =>
      item.toLowerCase().includes(query)
    );
  }
}
