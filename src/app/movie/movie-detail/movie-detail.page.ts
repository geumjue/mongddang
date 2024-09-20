import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  isGalleryOpen = true;
  //슬라이더 옵션 설정
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loadData()
  }
  loadData() {

  }

  goBackHomePage() {
    this.router.navigate(['/tabs/tab1']); // 로그인 페이지로 이동합니다

  }
  goToCommentWritePage() {
    this.router.navigate(['/comment-write']);
  }

  closeGallery() {
    this.isGalleryOpen = false;
  }
}