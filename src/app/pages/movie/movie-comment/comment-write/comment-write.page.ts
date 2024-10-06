import { Component, OnInit } from '@angular/core';
import {CommentWriteResponseData} from "../../../../models/comment/comment-write-response-data";
import {CommentService} from "../../../../services/commet/comment.sevice";
import {AuthService} from "../../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-comment-write',
  templateUrl: './comment-write.page.html',
  styleUrls: ['./comment-write.page.scss'],
})

export class CommentWritePage {

  content = "";

  constructor(private route: Router,private activateRoute: ActivatedRoute, private commentService: CommentService, private authService: AuthService) { }


  goBackMovieDetail(movieId: string){
    this.route.navigate([`movie/detail/${movieId}`])
  }

  postCommentById(username: string, content: string, movieId: string){
    this.commentService.postCommentById(username, content, movieId).subscribe({
      next: (response: CommentWriteResponseData) => {
        this.goBackMovieDetail(movieId)
      },
      error: (err: any) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }
    })


export class CommentWritePage implements OnInit {
  commentText: string = ''; // 댓글 텍스트 초기화

  }

  saveComment() {
    const username = this.authService.user?.username ?? "";
    const content = this.content;
    const movieId =this.activateRoute.snapshot.params['id'];
    this.postCommentById(username, content, movieId)

  ngOnInit() {}

  // 저장 기능 구현
  saveComment() {
    if (this.commentText.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    // 여기서 API 호출 등 저장 로직을 추가하세요.
    console.log('저장된 댓글:', this.commentText);

    // 저장 후 입력 필드 초기화
    this.commentText = '';

  }
}
