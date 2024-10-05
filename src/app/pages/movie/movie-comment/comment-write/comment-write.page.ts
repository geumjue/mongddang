import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-write',
  templateUrl: './comment-write.page.html',
  styleUrls: ['./comment-write.page.scss'],
})
export class CommentWritePage implements OnInit {
  commentText: string = ''; // 댓글 텍스트 초기화

  constructor() { }

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
