import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage  {
  searchTerm: string = '';
  searchResults: string[] = [];

  // 예시 데이터
  data: string[] = [
    '베테랑',
    '미이라',
    '나홀로집에',
    '센과치히로의행방불명',
    '범죄도시',
    '겨울왕국'
  ];

  constructor() {}

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchResults = this.data.filter(item =>
      item.toLowerCase().includes(query)
    );
  }
}

