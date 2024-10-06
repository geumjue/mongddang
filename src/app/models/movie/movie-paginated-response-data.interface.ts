import { MovieWithUserResponseData } from "./movie-with-user-response-data.interface";

export interface MoviePaginatedResponseData {
    movies: MovieWithUserResponseData[];
    total: number; // 총 영화 수
    page: number; // 현재 페이지
    limit: number; // 페이지당 영화 수
  }
  