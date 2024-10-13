import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from "@angular/router";
import {MovieService} from "../../services/movie/movie.service";
import {GetMoviesResponseData} from "../../models/movie/movie-getmovie-response-data.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit{
  // @ViewChild('swiper_preview') swiperRef_preview!: ElementRef;
  @ViewChild('swiper_cgv') swiperRef_cgv!: ElementRef;
  @ViewChild('swiper_netflix') swiperRef_netflix!: ElementRef;

  // 변수 설정
  movies: GetMoviesResponseData[] = [];

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies()
  }

  ngAfterViewInit() {
    // const swiperEl_preview = this.swiperRef_preview.nativeElement;
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
  }

  goToNowsCommentPage() {
    this.router.navigate(['nows-comment']);
  }

  // goToSearchPage() {
  //   this.router.navigate(['tabs/search']);
  // }

  getMovies() {
    this.movieService.getMovies().subscribe({
      next: (response: GetMoviesResponseData[]) => {
        this.movies = response;
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }

  goToMovieDetailPage(id: string) {
    this.router.navigate([`movie/detail/${id}`]);
  }
}

