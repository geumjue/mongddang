import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MovieService } from "../../services/movie/movie.service";
import { GetMoviesResponseData } from "../../models/movie/movie-getmovie-response-data.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  @ViewChild('swiper_cgv') swiperRef_cgv!: ElementRef;
  @ViewChild('swiper_netflix') swiperRef_netflix!: ElementRef;
  @ViewChild('elementRef', { static: false }) elementRef!: ElementRef;

  movies: GetMoviesResponseData[] = [];
  recommendedMovies: GetMoviesResponseData[] = []; // 추천 영화 데이터

  constructor(private router: Router,
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

      const params = {
        slidesPerView: 3,
        spaceBetween: 5,
      };

      Object.assign(swiperEl_cgv, params);
      swiperEl_cgv.initialize();

      Object.assign(swiperEl_netflix, params);
      swiperEl_netflix.initialize();
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
  loadRecommendedMovies(genre: string) {
    console.log('Filtering movies for genre:', genre);
    console.log('Available movies:', this.movies);
  
    this.recommendedMovies = this.movies.filter(
      (movie) => movie.genre?.trim() === genre.trim()
    );
  
    console.log('Filtered recommended movies:', this.recommendedMovies);
  
    localStorage.setItem('recommendedMovies', JSON.stringify(this.recommendedMovies));
  }
  
}
