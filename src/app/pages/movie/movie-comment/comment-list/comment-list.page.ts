// comment-list.page.ts
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../../services/comment/comment.sevice';
import { ActivatedRoute } from '@angular/router';

import {CommentListResponseData} from "../../../../models/comment/comment-list-response-data";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.page.html',
  styleUrls: ['./comment-list.page.scss'],
})
export class CommentListPage implements OnInit {
  comments: CommentListResponseData[] = [];
  movieId: string='';

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.loadComments(this.movieId);
  }

  loadComments(movieId: string) {
    this.commentService.getCommentsByMovieId(movieId).subscribe({
      next: (data: CommentListResponseData[]) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Failed to load comments:', err);
      }
    });
  }
}
