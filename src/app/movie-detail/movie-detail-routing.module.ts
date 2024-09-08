import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailPage } from './movie-detail.page';
import {CommentWritePage} from "../comment-write/comment-write.page";

const routes: Routes = [
  {
    path: '',
    component: MovieDetailPage
  },
  {

    path: 'comment-write',
    component: CommentWritePage,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailPageRoutingModule {}
