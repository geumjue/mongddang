import {GetMoviesResponseData} from "../movie/movie-getmovie-response-data.interface";

export interface GetCollectionsResponseData{
  id: number;
  name: string;
  like: number;
  movies: GetMoviesResponseData[]; //DTO임
  createdAt: string;
  modifiedAt: string;
}
