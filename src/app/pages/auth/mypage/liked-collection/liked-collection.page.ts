import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ShowFavoriteCollectionsResponseData, ShowFavoritesResponseData } from 'src/app/models/favorite/favorite-request.data';
import { FavoriteCollectionRequestData } from 'src/app/models/favorite/favorite-request.data';

interface LikedCollection {
  collectionId: number;
  collectionName: string;
  description: string;
}

@Component({
  selector: 'app-liked-collection',
  templateUrl: './liked-collection.page.html',
  styleUrls: ['./liked-collection.page.scss'],
})
export class LikedCollectionPage implements OnInit {
  isLoggedIn: boolean = false;
  user = { id: 0, username: '', email: '' };
  likedCollections: LikedCollection[] = [];

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

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

  toggleFavorite(collection: LikedCollection) {
    const userId = parseInt(this.authService.getUserIdFromToken()!, 10);

    const favoriteData: FavoriteCollectionRequestData = {
      userId: userId,
      collectionId: collection.collectionId,
      collectionName: collection.collectionName,
      description: collection.description,
    };

    if (this.checkIfFavorited(collection.collectionId)) {
      this.favoriteService.removeFavorite(userId, collection.collectionId).subscribe({
        next: () => {
          console.log(`컬렉션 ${collection.collectionName}의 좋아요가 제거되었습니다.`);
          this.likedCollections = this.likedCollections.filter(
            (c) => c.collectionId !== collection.collectionId
          );
          this.getUserData();
        },
        error: (err) => {
          console.error('좋아요 제거 중 오류 발생:', err);
        },
      });
    } else {
      this.favoriteService.addFavoriteCollection(favoriteData).subscribe({
        next: () => {
          console.log(`컬렉션 ${collection.collectionName}의 좋아요가 추가되었습니다.`);
          this.likedCollections.push(collection);
          this.getUserData();
        },
        error: (err) => {
          console.error('좋아요 추가 중 오류 발생:', err);
        },
      });
    }
  }

  checkIfFavorited(collectionId: number): boolean {
    return this.likedCollections.some((collection) => collection.collectionId === collectionId);
  }

  getUserData() {
    const userId = parseInt(this.authService.getUserIdFromToken()!, 10);
    if (!isNaN(userId) && userId > 0) {
      this.favoriteService.getUserFavoriteCollections(userId).subscribe({
        next: (favorites: ShowFavoriteCollectionsResponseData[]) => {
          this.likedCollections = favorites.map((fav) => ({
            collectionId: fav.collectionId,
            collectionName: fav.collectionName,
            description: fav.description,
          }));
        },
        error: (err) => {
          console.error('Error fetching user favorites:', err);
        },
      });
    } else {
      console.error('Invalid user ID or user not logged in.');
    }
  }
}
