import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentListResponseData } from '../../../../models/comment/comment-list-response-data';
import { ApiResponse } from 'src/app/models/common/api-response.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { GetUserResponseData } from 'src/app/models/user/user-getuser-response.data.interface';
import { CommentService } from 'src/app/services/comment/comment.sevice';
import { jwtDecode } from 'jwt-decode';
import { AlertController } from '@ionic/angular';

interface CommentWithMovie {
  comment: CommentListResponseData;
  movieTitle: string;
  posterUrl: string;
  username: string; // 사용자 이름 추가
}

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.page.html',
  styleUrls: ['./comment-list.page.scss'],
})
export class CommentListPage implements OnInit {
  comments: CommentWithMovie[] = [];
  movieId: number = 0;
  user = { username: '' };

  constructor(
    private alertController: AlertController,
    private commentService: CommentService,
    private movieService: MovieService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.params['id']);
    this.loadComments(this.movieId);
    this.checkForNewComment();
    this.getUserData(); // 사용자 정보 로드
  }
  checkForNewComment() {
    const navigation = this.router.getCurrentNavigation();
    const newComment = navigation?.extras?.state?.['newComment'];
    if (newComment) {
      this.fetchMovieDetails(this.movieId, newComment);
    }

  }

  loadComments(movieId: number) {
    this.commentService.getCommentsByMovieId(movieId).subscribe({
      next: (response: ApiResponse<CommentListResponseData[]>) => {
        this.comments = [];
        response.data.forEach((comment) => this.fetchMovieDetails(comment.movieId, comment));
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
          console.log('User Data:', user);
          this.user.username = user.username; // 사용자 이름 저장
        },
        error: (err) => {
          console.error('사용자 정보를 가져오는 중 오류:', err);
        },
        complete: () => {
          console.log('사용자 정보 요청 완료.');
        }
      });
    } else {
      console.warn('No user email found in token');
    }
  }

  private fetchMovieDetails(movieId: number, comment: CommentListResponseData) {
    this.movieService.getMovieById(movieId.toString()).subscribe({
      next: (movieData) => {
        this.fetchUsername(comment.userId).then(username => {
          this.comments.push({
            comment: comment,
            movieTitle: movieData.title || '제목 없음',
            posterUrl: movieData.posterUrl || '/assets/default-poster.jpg',
            username: username, // 사용자 이름 추가
          });
        });
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      }
    });
  }

  private async fetchUsername(userId: number): Promise<string> {
    try {
      const userData = await this.userService.getUserById(userId).toPromise();
      console.log('Fetched User Data:', userData); // 디버그용 로그 추가
      return userData?.username || '알 수 없음';
    } catch (error) {
      console.error('Failed to fetch username:', error);
      return '알 수 없음';
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
}
