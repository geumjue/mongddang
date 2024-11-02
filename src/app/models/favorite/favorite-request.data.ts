export interface FavoriteRequestData {
  userId: number;
  movieId: number;
  movietitle: string;
  posterUrl: string;
}

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

export interface FavoriteCollectionRequestData {
  userId: number;
  collectionId: number;
  collectionName: string;
  description: string;
}

export interface ShowFavoriteCollectionsResponseData {
  collectionId: number;
  collectionName: string;
  description: string;
  addedAt: Date;
}


