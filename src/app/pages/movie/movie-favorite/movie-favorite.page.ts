import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-favorite',
  templateUrl: './movie-favorite.page.html',
  styleUrls: ['./movie-favorite.page.scss']
})
export class MovieFavoritePage implements OnInit {
  favoriteMovies: { title: string; posterUrl: string }[] = []; // 저장된 영화 포스터 리스트

  constructor(private router: Router) {}

  ngOnInit() {
    const storedMovies = localStorage.getItem('favoriteMovies');
    if (storedMovies) {
      this.favoriteMovies = JSON.parse(storedMovies);
      this.favoriteMovies.sort((a, b) => a.title.localeCompare(b.title)); // 제목으로 정렬
    }
  }

  goBack() {
    this.router.navigate(['/tabs/tab1']); 
  }
}
