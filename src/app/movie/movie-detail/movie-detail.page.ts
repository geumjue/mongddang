import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  isModalOpen = false; // Modal 열림 상태

  // Modal을 열기 위한 메서드
  presentModal() {
    this.isModalOpen = true; // Modal 열림
  }

  // Modal을 닫기 위한 메서드
  closeModal() {
    this.isModalOpen = false; // Modal 닫힘
  }

  isGalleryOpen = true;
  //슬라이더 옵션 설정
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private router: Router) {
    addIcons({ personCircle });




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
