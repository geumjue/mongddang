import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from "../../../services/movie/movie.service";
import { GetMovieByIdResponseData } from "../../../models/movie/movie-getmoviebyid-response-data.interface";
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss']
})
export class MovieDetailPage implements OnInit {

  isCollectionModalOpen = false;
  isGalleryModalOpen = false;
  isSecondModalOpen = false;
  selectedItem: string | undefined;

  id: string = '';
  isModalOpen = false;
  selectedImage: string | null = null;
  isLiked: boolean = false;

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

  constructor(private route: Router, private activateRoute: ActivatedRoute , private movieService: MovieService) {
    addIcons({ personCircle });
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.getMovieById(this.id)
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
      favoriteMovies.push({ title: this.movie.title, posterUrl: this.movie.posterUrl });
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      // this.route.navigate(['/movie-favorite']); // 좋아요 클릭 후 favorite 페이지로 이동
    }
  }

  goBackHomePage() {
    this.route.navigate(['/home']);
  }

  goToCommentWritePage() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.route.navigate([`movie/detail/${this.id}/comment/write`]);
  }
  goToMovieCharacterPage() {
    this.route.navigate([`movie/character`]);
  }




  presentCollectionModal() {
    this.isCollectionModalOpen = true;
  }

  closeCollectionModal() {
    this.isCollectionModalOpen = false;
  }

  openSecondModal(item: string) {
    this.selectedItem = item; // 선택한 아이템을 저장
    this.isSecondModalOpen = true; // 두 번째 모달 열기
  }

  closeSecondModal() {
    this.isSecondModalOpen = false; // 두 번째 모달 닫기
  }

  presentGalleryModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal() {
    this.isGalleryModalOpen = false;
    this.selectedImage = null;
  }
  // presentModal(imageUrl: string) {
  //   this.selectedImage = imageUrl;
  //   this.isModalOpen = true;
  // }
  //
  //
  // closeModal() {
  //   this.isModalOpen = false;
  //   this.selectedImage = null;
  // }

  getMovieById(id: string) {
    this.movieService.getMovieById(id).subscribe({
      next: (response: GetMovieByIdResponseData) => {
        this.movie = response;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
}
