import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ShowFavoritesResponseData } from 'src/app/models/favorite/favorite-request.data';
import { GetMovieByIdResponseData } from 'src/app/models/movie/movie-getmoviebyid-response-data.interface';

interface LikedMovie {
  movieId: number;
  movietitle: string;
  posterUrl: string;
  genre: string;
  runningTime: number;
  nation: string;
  ratedYn: boolean;
  type: string;
  releasedAt: string;
  createdAt: string;
  modifiedAt: string;
}

@Component({
  selector: 'app-liked-movie',
  templateUrl: './liked-movie.page.html',
  styleUrls: ['./liked-movie.page.scss'],
})
export class LikedMoviePage implements OnInit {
  isLoggedIn: boolean = false;
  user = { id: 0, username: '', email: '' };
  likedMovies: LikedMovie[] = [];

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.getUserData();
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  checkIfFavorited(movieId: number): boolean {
    return this.likedMovies.some((movie) => movie.movieId === movieId);
  }

  toggleFavorite(movie: LikedMovie) {
    const userId = parseInt(this.authService.getUserIdFromToken()!, 10);
    if (this.checkIfFavorited(movie.movieId)) {
      this.favoriteService.removeFavorite(userId, movie.movieId).subscribe({
        next: () => {
          console.log(`영화 ${movie.movietitle}의 좋아요가 제거되었습니다.`);
          // UI에서 즉시 제거
          this.likedMovies = this.likedMovies.filter((m) => m.movieId !== movie.movieId);
          this.getUserData(); // 서버에서 최신 데이터 가져오기
        },
        error: (err) => {
          console.error('좋아요 제거 중 오류 발생:', err);
        }
      });
    } else {
      const favoriteData = {
        userId: userId,
        movieId: movie.movieId,
        movietitle: movie.movietitle,
        posterUrl: movie.posterUrl,
        genre: movie.genre,
        runningTime: movie.runningTime,
        nation: movie.nation,
        ratedYn: movie.ratedYn,
        type: movie.type,
        releasedAt: movie.releasedAt,
        createdAt: movie.createdAt,
        modifiedAt: movie.modifiedAt,
      };
      this.favoriteService.addFavorite(favoriteData).subscribe({
        next: () => {
          console.log(`영화 ${movie.movietitle}의 좋아요가 추가되었습니다.`);

          // 즉시 likedMovies 배열에 추가
          this.likedMovies.push(favoriteData);

          // Local storage 업데이트
          const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
          favoriteMovies.push(favoriteData);
          localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

          this.getUserData(); // 서버에서 최신 데이터 가져오기
        },
        error: (err) => {
          console.error('좋아요 추가 중 오류 발생:', err);
        }
      });
    }
  }

  getUserData() {
    const userId = parseInt(this.authService.getUserIdFromToken()!, 10);
    if (!isNaN(userId) && userId > 0) {
      console.log('Fetching user data for user ID:', userId);

      this.likedMovies = []; // 기존 likedMovies 배열 초기화

      this.favoriteService.getUserFavorites(userId).subscribe({
        next: (favorites: ShowFavoritesResponseData[]) => {
          console.log('User Favorites Response:', favorites);
          favorites.forEach(fav => {
            console.log(`Favorite movie ID: ${fav.movieId}`);
          });

          if (favorites && favorites.length > 0) {
            favorites.forEach((fav) => {
              this.movieService.getMovieById(fav.movieId.toString()).subscribe({
                next: (movieData: GetMovieByIdResponseData) => {
                  this.likedMovies.push({
                    movieId: parseInt(movieData.id, 10),
                    movietitle: movieData.title || '제목 없음',
                    posterUrl: movieData.posterUrl || '/assets/default-poster.jpg',
                    genre: movieData.genre || '장르 없음',
                    runningTime: movieData.runningTime || 0,
                    nation: movieData.nation || '정보 없음',
                    ratedYn: movieData.ratedYn || false,
                    type: movieData.type || '알 수 없음',
                    releasedAt: movieData.releasedAt || '발매일 미정',
                    createdAt: movieData.createdAt || '',
                    modifiedAt: movieData.modifiedAt || '',
                  });
                  console.log('Updated likedMovies array:', this.likedMovies);
                },
                error: (err) => {
                  console.error(`Error fetching movie details for movie ID ${fav.movieId}:`, err);
                }
              });
            });
          } else {
            console.log('좋아요한 영화가 없습니다.');
          }
        },
        error: (err) => {
          console.error('Error fetching user favorites:', err);
        }
      });
    } else {
      console.error('Invalid user ID or user not logged in.');
    }
  }


}
