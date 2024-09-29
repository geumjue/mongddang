import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit{
  // @ViewChild('swiper_preview') swiperRef_preview!: ElementRef;
  @ViewChild('swiper_cgv') swiperRef_cgv!: ElementRef;
  @ViewChild('swiper_netflix') swiperRef_netflix!: ElementRef;

  constructor(private router: Router) {}

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

  // goToNowsCommentPage() {
  //   this.router.navigate(['tabs/home/nows-comment']);
  // }

  //   goToMovieDetailPage()
  //   {
  //     this.router.navigate(['tabs/home/movie-detail']);

  //   }
  // goToSearchPage() {
  //   this.router.navigate(['tabs/search']);
  // }

}

