import { Component } from '@angular/core';
import {CommentWriteResponseData} from "../../../../models/comment/comment-write-response-data";
import {CommentService} from "../../../../services/comment/comment.sevice";
import {AuthService} from "../../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-comment-write',
  templateUrl: './comment-write.page.html',
  styleUrls: ['./comment-write.page.scss'],
})

export class CommentWritePage {

  content = "";

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService) {}


  goBackMovieDetail() {
    const movieId = this.activateRoute.snapshot.params['id'];
    this.route.navigate([`movie/detail/${movieId}`])
  }

  postCommentById(username: string, content: string, movieId: string) {
    this.commentService.postCommentById(username, content, movieId).subscribe({
      next: (response: CommentWriteResponseData) => {
        this.goBackMovieDetail()
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }

  saveComment() {
    const username = this.authService.user?.username ?? "";
    const content = this.content;
    const movieId = this.activateRoute.snapshot.params['id'];
    this.postCommentById(username, content, movieId)
  }
}
