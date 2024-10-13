import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liked-movie',
  templateUrl: './liked-movie.page.html',
  styleUrls: ['./liked-movie.page.scss'],
})
export class LikedMoviePage implements OnInit {
  likedMovies: any[] = [];

  ngOnInit() {
    this.loadLikedMovies();
  }

  loadLikedMovies() {
    const storedMovies = localStorage.getItem('favoriteMovies');
    if (storedMovies) {
      this.likedMovies = JSON.parse(storedMovies);
    }
  }
}
