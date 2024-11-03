import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPage } from './movie-search/search.page';
import { MovieDetailPage } from './movie-detail/movie-detail.page';
import { CommentWritePage } from './movie-comment/comment-write/comment-write.page';
import { MovieFavoritePage } from './movie-favorite/movie-favorite.page';
import {CommentListPage} from "./movie-comment/comment-list/comment-list.page";
import {AddCollectionPage} from "../collection/add-collection/add-collection.page";



const routes: Routes = [
  {
    path: '',
    component: SearchPage
  },
  {
    path: '',
    component: MovieFavoritePage
  },

  {
    path: 'detail/:id',
    component: MovieDetailPage // 영화 상세 페이지 컴포넌트
  },
  {
    path: 'search',
    component: SearchPage
  },
  {
    path: 'detail/:id/comment/write',
    component: CommentWritePage
  },

  {
    path: 'detail/:id/comment/list',
    component: CommentListPage
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviePageRoutingModule {}
