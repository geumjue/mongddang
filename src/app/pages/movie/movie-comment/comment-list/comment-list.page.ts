import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentListResponseData } from '../../../../models/comment/comment-list-response-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';
import { CommentService } from 'src/app/services/comment/comment.sevice';
import {GetMovieByIdResponseData} from "../../../../models/movie/movie-getmoviebyid-response-data.interface";
import { FavoriteService } from 'src/app/services/favorite/favorite.service'; // FavoriteService import


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.page.html',
  styleUrls: ['./comment-list.page.scss'],
})
export class CommentListPage implements OnInit {
  movieId: number = 0;
  movieInfo = {
    title: '',
    posterUrl: ''
  }
  user = { username: '' };
  comments: CommentListResponseData[] = [];
  isLiked: boolean = false;
  likedMovies: any[] = []; // 좋아요한 영화 배열 추가


  constructor(
    private commentService: CommentService,
    private movieService: MovieService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private favoriteService: FavoriteService

  ) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.params['id']);
    this.loadMovieDetail(this.movieId)
    this.loadComments(this.movieId);
    this.getUserData(); // 사용자 정보 로드
    this.checkIfLiked(); // 좋아요 상태 확인
  }

  loadMovieDetail(movieId: number) {
    this.movieService.getMovieById(movieId.toString()).subscribe({
      next: (response: GetMovieByIdResponseData) => {
        this.movieInfo = response;
      },
      error: (err: any) => {
        console.error('Failed to load Movie Detail', err);
      }
    })
  }

  loadComments(movieId: number) {
    this.commentService.getCommentsByMovieId(movieId).subscribe({
      next: (response: CommentListResponseData[]) => {
        this.comments = response.reverse()
      },
      error: (err: any) => {
        console.error('Failed to load comments:', err);
      }
    });
  }

  getUserData() {
    const email = this.getUserEmailFromToken();
    if (email) {
      this.userService.getUserByEmail(email).subscribe({
        next: (user: GetUserResponseData) => {
          this.user.username = user.username; // 사용자 이름 저장
        },
        error: (err) => {
          console.error('사용자 정보를 가져오는 중 오류:', err);
        }
      });
    } else {
      console.warn('No user email found in token');
    }
  }

  private getUserEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.authService.decodeToken(token);
      return decodedToken?.email || null;
    }
    return null;
  }

  // 영화 상세 페이지로 돌아가는 메서드
  goBackMovieDetail() {
    const movieId = this.route.snapshot.params['id'];
    this.router.navigate([`movie/detail/${movieId}`]);
  }

  // 좋아요 상태 확인
  checkIfLiked() {
    const userId = parseInt(this.authService.user?.id || '0', 10);
    this.favoriteService.getUserFavorites(userId).subscribe({
      next: (favorites) => {
        this.isLiked = favorites.some(fav => fav.movieId === this.movieId);
      },
      error: (err: any) => {
        console.error('좋아요 상태 확인 중 오류 발생:', err);
      }
    });
  }
  // 좋아요 토글 메서드
  toggleLike() {
    this.isLiked = !this.isLiked;

    const userId = parseInt(this.authService.user?.id || '0', 10);

    if (this.isLiked) {
      const newFavorite = {
        movieId: this.movieId,
        movietitle: this.movieInfo.title || '제목 없음',
        posterUrl: this.movieInfo.posterUrl || '/assets/default-poster.jpg',
        userId: userId,
      };

      this.favoriteService.addFavorite({
        userId: userId,
        movieId: newFavorite.movieId,
        movietitle: newFavorite.movietitle,
        posterUrl: newFavorite.posterUrl
      }).subscribe({
        next: () => {
          console.log('좋아요가 저장되었습니다.');
          this.likedMovies.push(newFavorite);
        },
        error: (err: any) => {
          console.error('좋아요 추가 중 오류 발생:', err);
        }
      });
    } else {
      this.favoriteService.removeFavorite(userId, this.movieId).subscribe({
        next: () => {
          console.log('좋아요가 취소되었습니다.');
          this.likedMovies = this.likedMovies.filter(movie => movie.movieId !== this.movieId);
        },
        error: (err: any) => {
          console.error('좋아요 제거 중 오류 발생:', err);
        }
      });
    }
  }

}
