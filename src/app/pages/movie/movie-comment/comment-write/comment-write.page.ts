import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../../services/auth/auth.service";
import { UserService } from 'src/app/services/user/user.service'; // Import UserService
import { CommentWriteRequestData } from 'src/app/models/comment/comment-write-request-data';
import { CommentListResponseData } from 'src/app/models/comment/comment-list-response-data';
import { CommentService } from 'src/app/services/comment/comment.sevice';

@Component({
  selector: 'app-comment-write',
  templateUrl: './comment-write.page.html',
  styleUrls: ['./comment-write.page.scss'],
})
export class CommentWritePage implements OnInit {
  commentContent: string = '';
  movieTitle: string = ''; // 필요시 영화 제목 설정
  username: string = '';   // 사용자 이름을 저장할 변수
  userId: string | null = null; // userId를 저장할 변수
  movieId: string | null = null; // movieId를 string으로 유지할 경우
  content = "";
  rating: number = 0; // 별점 변수 추가
  stars: number[] = Array(5).fill(0); // 별 5개 배열 생성

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
    private userService: UserService // Add UserService to constructor
  ) {
  }

  ngOnInit() {
    this.initializeUser();
  }


  // 사용자 정보를 초기화
  private initializeUser() {
    this.userId = this.authService.getUserIdFromToken();

    // If the username is not available in AuthService, fetch it from the backend
    if (this.authService.user?.username) {
      this.username = this.authService.user.username;
    } else if (this.userId) {
      this.userService.getUserById(parseInt(this.userId)).subscribe({
        next: (user) => {
          this.username = user.username;
          console.log('Fetched User Data:', {userId: this.userId, username: this.username});
        },
        error: (err) => {
          console.error('Failed to fetch user data:', err);
          this.username = 'Unknown';
        }
      });
    } else {
      console.warn('User ID is not available, cannot fetch user data.');
      this.username = 'Unknown';
    }

    console.log('Initialized user in CommentWritePage:', {userId: this.userId, username: this.username});
  }


  // 댓글 작성 메서드
  writeComment() {
    if (!this.userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const commentWriteRequestData: CommentWriteRequestData = {
      commentContent: this.commentContent,
      movieId: this.activateRoute.snapshot.params['id'],
      userId: parseInt(this.userId ?? '0', 10), // userId가 null일 경우 '0'을 기본값으로 사용
    };

    this.commentService.writeComment(commentWriteRequestData).subscribe({
      next: response => {
        if (response.success) {
          console.log('Comment submission successful:', response.data);
          alert('댓글 작성이 완료되었습니다.');

          // 새로운 코멘트 객체 생성
          const newComment: CommentListResponseData = {
            userId: parseInt(this.userId ?? '0', 10), // userId가 null일 경우 '0'을 기본값으로 사용
            username: this.username,               // 초기화된 사용자 이름
            movieId: parseInt(this.movieId ?? '1', 10),
            movieTitle: this.movieTitle,           // 영화 제목
            commentContent: this.commentContent,   // 댓글 내용
            favoriteCount: 0,
            dislikeCount: 0,
          };

          // 새로운 코멘트를 포함하여 목록 페이지로 이동
          this.goToCommentsPage(commentWriteRequestData.movieId, newComment);
        } else {
          console.error('Comment submission failed:', response.message);
          alert('댓글 작성 실패했습니다: ' + response.message);
        }
      },
      error: (err) => {
        console.error('Comment submission error:', err);
        alert('댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    });
  }

  // 영화 상세 페이지로 돌아가는 메서드
  goBackMovieDetail() {
    const movieId = this.activateRoute.snapshot.params['id'];
    this.route.navigate([`movie/detail/${movieId}`]);
  }

  // 댓글 목록 페이지로 이동
  goToCommentsPage(movieId: number, newComment?: CommentListResponseData) {
    this.route.navigate([`movie/detail/${movieId}/comment/list`], {
      state: {newComment}  // 새로운 코멘트를 state로 전달
    });
  }

  setRating(index: number) {
    this.rating = index; // 클릭한 별에 따라 별점 설정
  }
}
