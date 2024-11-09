import { Component } from '@angular/core';
import { CommentWriteResponseData } from "../../../../models/comment/comment-write-response-data";
import { CommentService } from "../../../../services/comment/comment.sevice";
import { AuthService } from "../../../../services/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-comment-write',
  templateUrl: './comment-write.page.html',
  styleUrls: ['./comment-write.page.scss'],
})

export class CommentWritePage {
  content = "";
  rating: number = 0; // 별점 변수 추가
  stars: number[] = Array(5).fill(0); // 별 5개 배열 생성

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  goBackMovieDetail() {
    const movieId = this.activateRoute.snapshot.params['id'];
    this.route.navigate([`movie/detail/${movieId}`]);
  }

  goToCommentsPage(movieId: string) {
    this.route.navigate([`movie/detail/${movieId}/comment/list`]); // 전체 코멘트 페이지로 이동
  }

  postCommentById(username: string, content: string, movieId: string) {
    this.commentService.postCommentById(username, content, movieId).subscribe({
      next: (response: CommentWriteResponseData) => {
        this.goToCommentsPage(movieId);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  saveComment() {
    const username = this.authService.user?.username ?? "";
    const content = this.content;
    const movieId = this.activateRoute.snapshot.params['id'];
    this.postCommentById(username, content, movieId);
  }

  setRating(index: number) {
    this.rating = index; // 클릭한 별에 따라 별점 설정
  }
}
