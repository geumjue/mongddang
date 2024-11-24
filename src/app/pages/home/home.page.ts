import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MovieService } from "../../services/movie/movie.service";
import { GetMoviesResponseData } from "../../models/movie/movie-getmovie-response-data.interface";

interface Movie {
  movieId: number;
  movietitle: string;
  posterUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  @ViewChild('swiper_cgv') swiperRef_cgv!: ElementRef;
  @ViewChild('swiper_netflix') swiperRef_netflix!: ElementRef;
  @ViewChild('swiper_genre') swiperRef_genre!: ElementRef;
  @ViewChild('swiper_recommended') swiperRef_recommended!: ElementRef;
  @ViewChild('elementRef', { static: false }) elementRef!: ElementRef;

  movies: GetMoviesResponseData[] = [];
  recommendedMovies: GetMoviesResponseData[] = []; // 추천 영화 데이터
  genres: string[] = [];
  moviesGroupedByGenre: { [key: string]: Movie[] } = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService) { }

    ngOnInit() {
      this.getMovies(() => {
        this.activatedRoute.queryParams.subscribe((params: { [key: string]: string }) => {
          const selectedGenre = params['genre'] || localStorage.getItem('selectedGenre');
          if (selectedGenre) {
            console.log('Loading recommended movies for genre:', selectedGenre);
            this.loadRecommendedMovies(selectedGenre);
          }
        });
      });
    }

  ngAfterViewInit() {
    if (this.swiperRef_cgv && this.swiperRef_netflix) {
      const swiperEl_cgv = this.swiperRef_cgv.nativeElement;
      const swiperEl_netflix = this.swiperRef_netflix.nativeElement;
      const swiperEl_genre = this.swiperRef_netflix.nativeElement;
      const swiperEl_recommended = this.swiperRef_recommended.nativeElement;

      const params = {
        slidesPerView: 3,
        spaceBetween: 5,
      };

      Object.assign(swiperEl_cgv, params);
      swiperEl_cgv.initialize();

      Object.assign(swiperEl_netflix, params);
      swiperEl_netflix.initialize();

      Object.assign(swiperEl_genre, params);
      swiperEl_genre.initialize();

      Object.assign(swiperEl_recommended, params);
      swiperEl_recommended.initialize();
    } else {
      console.warn('Swiper elements are not available for initialization');
    }
  }
  goToNowsCommentPage() {
    this.router.navigate(['nows-comment']);
  }

  goToSearchPage() {
    this.router.navigate(['search'], { state: { movies: this.movies } });
  }

  getMovies(callback?: () => void) {
    this.movieService.getMovies().subscribe({
      next: (response: GetMoviesResponseData[]) => {
        this.movies = response;
        console.log('Movies loaded:', this.movies);

        // 영화 데이터를 장르별로 그룹화
        this.groupMoviesByGenre(this.movies);

        // 콜백 실행
        if (callback) {
          callback();
        }
      },
      error: (err: any) => {
        console.error('Error fetching movies:', err);
      },
      complete: () => {
        console.log('Movie fetching complete');
      }
    });
  }
// 영화 데이터를 장르별로 그룹화
  groupMoviesByGenre(movies: GetMoviesResponseData[]) {
    const groupedByGenre: { [key: string]: Movie[] } = {};

    movies.forEach((movie) => {
      const genre = movie.genre || '기타';
      if (!groupedByGenre[genre]) {
        groupedByGenre[genre] = [];
      }
      groupedByGenre[genre].push({
        movieId: parseInt(movie.id, 10),
        movietitle: movie.title,
        posterUrl: movie.posterUrl || 'assets/default-poster.jpg',
      });
    });

    this.moviesGroupedByGenre = groupedByGenre;
    this.genres = Object.keys(groupedByGenre); // 장르 키 배열 생성
    console.log('Movies grouped by genre:', this.moviesGroupedByGenre);
  }


  goToMovieDetailPage(id: string) {
    if (id) {
      this.router.navigate([`movie/detail/${id}`]);
    } else {
      console.warn('Invalid movie ID');
    }
  }
  goToRecommendationPage() {
    this.router.navigate(['recommendation'], { state: { movies: this.movies } })
  }
  // 특정 장르의 추천 영화를 로드
  loadRecommendedMovies(genre: string) {
    console.log('Filtering movies for genre:', genre);
    this.recommendedMovies = this.movies.filter(
      (movie) => movie.genre?.trim() === genre.trim()
    );

    console.log('Filtered recommended movies:', this.recommendedMovies);
    localStorage.setItem('recommendedMovies', JSON.stringify(this.recommendedMovies));
  }
}
