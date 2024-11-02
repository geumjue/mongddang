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
  searchResults: any[] = []; // 검색 결과 배열
  data: any[] = []; // 전체 영화 데이터 (박스오피스 영화 목록)

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (response: GetMoviesResponseData[]) => {
        this.data = response; // 전체 영화 데이터 저장
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  goToMovieDetail(title: string) {
    const selectedMovie = this.data.find(movie => movie.title === title);
    if (selectedMovie) {
      this.router.navigate(['/movie/detail', selectedMovie.id]); // 영화 상세 페이지로 이동
    }
  }

  searchMovies() {
    if (this.searchTerm.trim()) {
      this.searchResults = this.data
        .filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase())) // 제목에 검색어가 포함된 영화 필터링
        .map(item => ({ title: item.title, posterUrl: item.posterUrl })); // 제목과 포스터 URL만 포함
    } else {
      this.searchResults = []; // 검색어가 없으면 결과 초기화
    }
  }
}
