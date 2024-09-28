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

  public boxOfficeRankings = [
    {
      rank: 1,
      imgSrc:
        'https://an2-img.amz.wtchn.net/image/v2/y4O5Ld1e5z_ST_m5gzsBZQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpNeE16TTFOemczT1RreE16SXhNRFFpZlEuYmltNHdKY0p2VTUwbWZib19pM2tjN0MyekF6QXZjQnEtNUxjbG54TDZZOA',
      title: '임영웅 | 아임 히어로 더 스타디움',
      year: 2024,
      country: '한국',
      reservationRate: 35,
      cumulativeAudience: '461명',
    },
    {
      rank: 2,
      imgSrc:
        'https://an2-img.amz.wtchn.net/image/v2/5hebIEomnrG7kgFeIqfu4w.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpjMk1qZzFOVE0zTWpJME9UQXhNREFpZlEuMkpETVZmSDRJNGNhbWVIRkZ4R3dTeHZqcWl0YXNza2pNclNZcGNYWVFIaw',
      title: '베테랑2',
      year: 2024,
      country: '한국',
      reservationRate: 11,
      cumulativeAudience: null,
    },
    {
      rank: 3,
      imgSrc:
        'https://an2-img.amz.wtchn.net/image/v2/qOg861rxPOjah4hYso2OaQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpnNE16VTNNRE16TWpJNU5EQXlOeUo5LmtMN3plY3NSTTdkUC1kRFhnN1JzSWNRQm1JaG5YOFNvVDVUcUFFQTlxelU',
      title: '에이리언: 로물루스',
      year: 2024,
      country: '미국',
      reservationRate: 8.6,
      cumulativeAudience: '128.2만명',
    },
    {
      rank: 4,
      imgSrc:
        'https://an2-img.amz.wtchn.net/image/v2/sHRcYi-jneXz6urFyv73FQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpZeE5EVTRORFE0T1RBd05qSTBNU0o5LnZnVTA1dDZFbWo2TXpCOWFBc1oxcnk0Uk14MkRaVnhPejQwQ3o4clVHZnc',
      title: '소년시절의 너',
      year: 2019,
      country: '중국',
      reservationRate: 4.5,
      cumulativeAudience: '8.5만명',
    },
    {
      rank: 5,
      imgSrc:
        'https://an2-img.amz.wtchn.net/image/v2/4NDjepqQILlwmKRCJMeWgA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpnd05UUXpNVEV6TVRBeE5Ea3lNeUo5Lmg0c1RVMEx2NTdnY0tqMGZvc2E4RTRCdDFPSHRSVE04OFN4VkxKUkVvZGM',
      title: '한국이 싫어서',
      year: 2023,
      country: '한국',
      reservationRate: 4.4,
      cumulativeAudience: '2,241명',
    },
    {
      rank: 6,
      imgSrc:
        'https://an2-img.amz.wtchn.net/image/v2/CmI_5drhfBodm_Q65o_a5Q.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFNE1EWTBOekEwTmprMk1EVTRORFFpZlEuWmpwcHN5RXFGdGpfWE1Zdk92WDhucUtYSnpvc2ZnUTJ5bkR3M3lPNlFXZw',
      title: '파일럿',
      year: 2024,
      country: '한국',
      reservationRate: 3.8,
      cumulativeAudience: '427.6만명',
    },
  ];






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

    // Object.assign(swiperEl_preview, {
    //   slidesPerView: 1, // 한 번에 하나의 이미지 표시
    //   spaceBetween: 5,
    //   autoplay: {
    //     delay: 2000, // 2초마다 전환
    //     disableOnInteraction: false, // 사용자 상호작용 시에도 자동 전환 유지
    //   },
    //   loop: true, // 루프 설정
    // });
    // swiperEl_preview.initialize();
  }

  goToNowsCommentPage() {
    this.router.navigate(['tabs/home/nows-comment']);
  }

    goToMovieDetailPage()
    {
      this.router.navigate(['tabs/home/movie-detail']);

    }
  goToSearchPage() {
    this.router.navigate(['tabs/search']);
  }
  goToActorListPage() {
    this.router.navigate(['tabs/actor-list']);
  }


}

