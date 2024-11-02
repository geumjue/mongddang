import { GetMovieByIdResponseData } from '../movie/movie-getmoviebyid-response-data.interface';

export interface GetCollectionByIdResponseData {
  id: number;
  name: string;
  favoriteCount: number;
  movies: GetMovieByIdResponseData[];
  createdAt: string;
  modifiedAt: string;
}
