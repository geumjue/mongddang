export interface FavoriteResponseData {
    id: number;
    success: boolean;
    message: string;
  }
  
  export interface ShowFavoritesResponseData {
    userId: number;
    movieId: number;
    movietitle: string;
    posterUrl: string; 
    addedAt: Date;
  }
  
  export interface ShowFavoriteByIdResponseData {
    userId: number;
    movieId: number;
    movietitle: string;
    posterUrl: string; 
    addedAt: Date;
  }
  