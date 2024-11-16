import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { GetMovieByIdResponseData } from 'src/app/models/movie/movie-getmoviebyid-response-data.interface';
import { GetMoviesResponseData } from 'src/app/models/movie/movie-getmovie-response-data.interface';

interface LikedMovie {
  movieId: number;
  movietitle: string;
  posterUrl: string;
}
interface Movie{
  movieId:number;
  movietitle: string;
  posterUrl: string;

}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss']
})
export class RecommendationPage implements OnInit {
  isLoggedIn: boolean = false;
  user = { id: 0, username: '', email: '' };
  likedMovies: LikedMovie[] = [];
  movies: Movie[] = []; // movies 속성 추가
  selectedMovies: Movie[] = []; // 사용자가 선택한 영화 목록
  moviesGroupedByGenre: { [key: string]: Movie[] } = {}; // 장르별로 그룹화된 영화 데이터
  Object = Object; // Object를 템플릿에서 사용할 수 있도록 추가
  genres: string[] = []; // 장르 키 배열 추가

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getLoginStatus().subscribe({
      next: (status) => {
        this.isLoggedIn = status;
        if (this.isLoggedIn) {
          this.loadMovies(); // 영화 데이터를 로드
        } else {
          this.router.navigate(['/auth/login']); // 로그인 페이지로 리다이렉트
        }
      },
      error: (err) => {
        console.error('Error checking login status:', err);
      },
    });
  }

  getUserFavorites() {
    const userId = parseInt(this.authService.getUserIdFromToken()!, 10);
    if (!isNaN(userId) && userId > 0) {
      this.favoriteService.getUserFavorites(userId).subscribe({
        next: (favorites) => {
          console.log('User Favorites:', favorites);
          favorites.forEach((favorite) => {
            this.getMovieDetails(favorite.movieId);
          });
        },
        error: (err) => {
          console.error('Error fetching favorites:', err);
        }
      });
    } else {
      console.error('Invalid user ID.');
    }
  }

  getMovieDetails(movieId: number) {
    this.movieService.getMovieById(movieId.toString()).subscribe({
      next: (movie: GetMovieByIdResponseData) => {
        this.likedMovies.push({
          movieId: parseInt(movie.id, 10),
          movietitle: movie.title || '제목 없음',
          posterUrl: movie.posterUrl || '/assets/default-poster.jpg',
        });
        console.log('Liked Movies:', this.likedMovies);
      },
      error: (err) => {
        console.error(`Error fetching movie details for movie ID ${movieId}:`, err);
      }
    });
  }

  selectMovie(movie: Movie) {
    console.log('Selected movie:', movie);
  }
  navigateToHome() {
    this.router.navigate(['/home']); // Home 페이지로 이동
  }
  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const groupedByGenre: { [key: string]: Movie[] } = {};
          response.forEach((movie) => {
            const genre = movie.genre || '기타';
            if (!groupedByGenre[genre]) {
              groupedByGenre[genre] = [];
            }
            groupedByGenre[genre].push({
              movieId: parseInt(movie.id, 10),
              movietitle: movie.title,
              posterUrl: movie.posterUrl || 'assets/default-poster.jpg',
            });
          });
  
          this.moviesGroupedByGenre = groupedByGenre;
          this.genres = Object.keys(groupedByGenre); // 장르 키 배열
          console.log('Movies grouped by genre:', this.moviesGroupedByGenre);
        } else {
          console.error('No movies available.');
        }
      },
      error: (err) => {
        console.error('Error loading movies:', err);
      },
    });
  }
  
  toggleMovieSelection(movie: Movie) {
    const index = this.selectedMovies.findIndex((m) => m.movieId === movie.movieId);
    if (index > -1) {
      this.selectedMovies.splice(index, 1); // 이미 선택된 영화라면 선택 해제
    } else {
      this.selectedMovies.push(movie); // 선택되지 않은 영화라면 추가
    }
  }
  
  isSelected(movie: Movie): boolean {
    return this.selectedMovies.some((m) => m.movieId === movie.movieId);
  }
  
  goToShowRecommendedGenre() {
    if (this.selectedMovies.length === 0) {
      alert('먼저 영화를 선택해주세요!');
      return;
    }
  
    console.log('Selected movies:', this.selectedMovies);
  
    const genreCounts: { [key: string]: number } = {};
  
    this.selectedMovies.forEach((movie) => {
      const genre = this.getGenreByMovie(movie);
      console.log(`Movie ID: ${movie.movieId}, Genre: ${genre}`);
  
      if (!genreCounts[genre]) {
        genreCounts[genre] = 0;
      }
      genreCounts[genre]++;
    });
  
    const mostFrequentGenre = Object.keys(genreCounts).reduce((a, b) =>
      genreCounts[a] > genreCounts[b] ? a : b
    );
  
    alert(`가장 많이 선택된 장르: ${mostFrequentGenre}`);
  
    // 선택된 장르를 localStorage에 저장
    localStorage.setItem('selectedGenre', mostFrequentGenre);
  
    // Home 페이지로 이동하며 장르를 전달
    this.router.navigate(['/home'], { queryParams: { genre: mostFrequentGenre } });
  }
  
  
  
  getGenreByMovie(movie: Movie): string {
    console.log('Finding genre for movie:', movie);
  
    const foundGenre = Object.keys(this.moviesGroupedByGenre).find((genre) =>
      this.moviesGroupedByGenre[genre].some((m) => m.movieId === movie.movieId)
    );
  
    console.log('Found genre:', foundGenre);
  
    return foundGenre || '기타';
  }
  
}
