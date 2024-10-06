import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { MovieService } from "../../../services/movie/movie.service";
import { GetMovieByIdResponseData } from "../../../models/movie/movie-getmoviebyid-response-data.interface";
import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss']
})
export class MovieDetailPage implements OnInit {

  id: string = '';
  isModalOpen = false;  
  selectedImage: string | null = null; 
  isLiked: boolean = false; 

  movie = {
    id: "",
    title: "",
    directorName: "",
    genre: "",
    contents: "",
    runningTime: 0,
    posterUrl: "",
    stillUrl: "",
    favorite: 0,
    nation: "",
    company: "",
    ratedYn: false,
    type: "",
    actor: "",
    releasedAt: "",
    createdAt: "",
    modifiedAt: ""
  };

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) {
    addIcons({ personCircle });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getMovieById(this.id);
  }

  toggleLike() {
    this.isLiked = !this.isLiked; 
    if (this.isLiked) {
      const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
      favoriteMovies.push({ title: this.movie.title, posterUrl: this.movie.posterUrl });
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      this.router.navigate(['/movie-favorite']); // 좋아요 클릭 후 favorite 페이지로 이동
    }
  }

  goBackHomePage() {
    this.router.navigate(['/tabs/tab1']); 
  }

  goToCommentWritePage() {
    this.router.navigate(['/comment-write']); 
  }

  presentModal(imageUrl: string) {
    this.selectedImage = imageUrl; 
    this.isModalOpen = true; 
  }

  closeModal() {
    this.isModalOpen = false; 
    this.selectedImage = null; 
  }

  getMovieById(id: string) {
    this.movieService.getMovieById(id).subscribe({
      next: (response: GetMovieByIdResponseData) => {
        this.movie = response;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
}
