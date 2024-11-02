import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetMovieByIdResponseData } from "../../../models/movie/movie-getmoviebyid-response-data.interface";
import { MovieService } from '../../../services/movie/movie.service';
import { GetMoviesResponseData } from '../../../models/movie/movie-getmovie-response-data.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  searchTerm: string = '';
  searchResults: string[] = [];
  data: string[] = []; // 영화 제목 배열
  movie: GetMovieByIdResponseData | undefined; // 선택된 영화 정보를 저장하기 위한 변수

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies(); // 컴포넌트 초기화 시 영화 데이터 로드
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (response: GetMoviesResponseData[]) => {
        this.data = response.map(movie => movie.title); // 영화 제목 배열 초기화
      },
      error: (err: any) => {
        console.log(err);
      }
    });
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
