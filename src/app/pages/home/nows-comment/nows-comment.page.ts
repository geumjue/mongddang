import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nows-comment',
  templateUrl: './nows-comment.page.html',
  styleUrls: ['./nows-comment.page.scss'],
})
export class NowsCommentPage implements OnInit {
  showComments: boolean = false; // 댓글 표시 여부

  constructor() {}

  toggleComments() {
    this.showComments = !this.showComments; // 댓글 표시 상태 반전
  }

  ngOnInit() {
  }
}
