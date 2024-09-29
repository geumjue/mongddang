import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPage } from './movie-search/search.page';
import { MovieDetailPage } from './movie-detail/movie-detail.page';
import { CommentWritePage } from './movie-comment/comment-write/comment-write.page';

const routes: Routes = [
  {
    path: '', component: SearchPage
  },
  {
    path: 'detail/:id', component: MovieDetailPage
  },
  {
    path: 'search', component: SearchPage
  },
  {
    path: 'comment/write/:movieId', component: CommentWritePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviePageRoutingModule {}
