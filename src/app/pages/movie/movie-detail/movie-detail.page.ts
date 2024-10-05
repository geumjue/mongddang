import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import {MovieService} from "../../../services/movie/movie.service";
import {GetMovieByIdResponseData} from "../../../models/movie/movie-getmoviebyid-response-data.interface";



@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  id: string = '';

  isModalOpen = false;  // Modal 열림 상태
  selectedImage: string | null = null; // 선택된 이미지 경로 저장

  movie = {
    id: "",
    title: "",
    directorName: "",
    genre: "",
    contents: "",
    runningTime: 0,
    posterUrl: "",
    stillUrl: "",
    favorite: 0,
    nation: "",
    company: "",
    ratedYn: false,
    type: "",
    actor: "",
    releasedAt: "",
    createdAt: "",
    modifiedAt: ""

  };

  isGalleryOpen = true;
  //슬라이더 옵션 설정
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private route: ActivatedRoute , private movieService: MovieService) {
    addIcons({ personCircle });

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getMovieById(this.id)
  }

  // Modal을 열기 위한 메서드
  presentModal(imageUrl: string) {
    this.selectedImage = imageUrl; // 클릭된 이미지의 URL을 저장
    this.isModalOpen = true; // Modal 열림
  }

  // Modal을 닫기 위한 메서드
  closeModal() {
    this.isModalOpen = false; // Modal 닫힘
    this.selectedImage = null; // 선택된 이미지 초기화
  }

  goBackHomePage() {
    // this.router.navigate(['/tabs/tab1']); // 로그인 페이지로 이동합니다

  }
  goToCommentWritePage() {
    // this.router.navigate(['/comment-write']);
  }



  closeGallery() {
    this.isGalleryOpen = false;

  }

  getMovieById(id: string){
    this.movieService.getMovieById(id).subscribe({
      next: (response: GetMovieByIdResponseData) => {
        this.movie =response;
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }
    })

  }

}
