import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage  {
  showComments: boolean = false; // 댓글 표시 여부

  constructor() {}

  toggleComments() {
    this.showComments = !this.showComments; // 댓글 표시 상태 반전
  }
}

