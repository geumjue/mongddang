import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import {SeriesPage} from "../series/series.page";
import {BookPage} from "../book/book.page";

import {CommentPage} from "../comment/comment.page";

import {MovieDetailPage} from "../movie-detail/movie-detail.page";


const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'series',
    component: SeriesPage,
  },
  {
    path: 'book',
    component: BookPage,
  },
  {

    path: 'comment',
    component: CommentPage,
  },
  {

    path: 'movie-detail',
    component: MovieDetailPage,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
