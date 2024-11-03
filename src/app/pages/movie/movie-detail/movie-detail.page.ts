import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from "../../../services/movie/movie.service";
import { GetMovieByIdResponseData } from "../../../models/movie/movie-getmoviebyid-response-data.interface";
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { CollectionService } from "../../../services/collection/collection.service";
import { GetCollectionsResponseData } from "../../../models/collection/collection-getcollections.interface.data";
import { AuthService } from "../../../services/auth/auth.service";
import { FavoriteService } from "../../../services/favorite/favorite.service"; // FavoriteService import

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss']
})
export class MovieDetailPage implements OnInit {

  isCollectionModalOpen = false;
  isGalleryModalOpen = false;
  isSecondModalOpen = false;
  isModalOpen = false;
  isLiked: boolean = false;
  likedMovies: any[] = []; // likedMovies 속성 추가
  selectedItem: GetCollectionsResponseData = { // selectedItem 선언 추가
    id: 0,
    name: "",
    like: 0,
    movies: [],
    createdAt: "",
    modifiedAt: ""
  };

  selectedImage: string | null = null;
  id: string = '';

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

  collections: GetCollectionsResponseData[] = [];
  isGalleryOpen = true;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private movieService: MovieService,
    private collectionService: CollectionService,
    private authService: AuthService,
    private favoriteService: FavoriteService // FavoriteService 주입
  ) {
    addIcons({ personCircle });
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.getMovieById(this.id);
    console.log('AuthService user on page load:', this.authService.user);

    // 필요 시 강제로 사용자 정보 초기화 호출
    if (!this.authService.user) {
      this.authService.initializeUser();
    }

    // 좋아요 상태를 초기화
    this.checkIfLiked();
  }
  checkIfLiked() {
    const userId = parseInt(this.authService.user?.id || '0', 10); // userId를 number로 변환
    this.favoriteService.getUserFavorites(userId).subscribe({
      next: (favorites) => {
        this.isLiked = favorites.some(fav => fav.movieId === parseInt(this.id, 10));
        console.log(`isLiked 상태: ${this.isLiked}`);
      },
      error: (err: any) => {
        console.error('좋아요 상태 확인 중 오류 발생:', err);
      }
    });

  }
  toggleLike() {
    this.isLiked = !this.isLiked;
    console.log('AuthService user:', this.authService.user);

    let userId = parseInt(this.authService.user?.id || '0', 10); // userId를 number로 변환

    if (this.isLiked) {
      const newFavorite = {
        movieId: parseInt(this.movie.id, 10),
        movietitle: this.movie.title || '제목 없음',
        posterUrl: this.movie.posterUrl || '/assets/default-poster.jpg',
        userId: userId,
      };

      this.favoriteService.addFavorite({
        userId: userId,
        movieId: newFavorite.movieId,
        movietitle: newFavorite.movietitle, // 추가된 필드
        posterUrl: newFavorite.posterUrl // 추가된 필드
      }).subscribe({
        next: () => {
          console.log('좋아요가 저장되었습니다.', { success: true, message: '좋아하는 항목이 추가되었습니다.' });
          this.likedMovies.push(newFavorite);
          console.log('Updated likedMovies array:', this.likedMovies);
        },
        error: (err: any) => { // 타입 명시
          console.error('좋아요 추가 중 오류 발생:', err);
        }
      });
    } else {
      this.favoriteService.removeFavorite(userId, parseInt(this.movie.id, 10)).subscribe({
        next: () => {
          console.log('좋아요가 취소되었습니다.');
          this.likedMovies = this.likedMovies.filter(movie => movie.movieId !== parseInt(this.movie.id, 10));
          console.log('Updated likedMovies array after removal:', this.likedMovies);
        },
        error: (err: any) => { // 타입 명시
          console.error('좋아요 제거 중 오류 발생:', err);
        }
      });
    }

  }

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

  goToAddCollectionPage() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.route.navigate([`/collection/add-collection`]);
  }
  goBackHomePage() {
    this.route.navigate(['/home']);
  }

  goToCommentWritePage() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.route.navigate([`movie/detail/${this.id}/comment/write`]);
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedImage = null;
  }

  goToCommentListPage() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.route.navigate([`movie/detail/${this.id}/comment/list`]);
  }
}
