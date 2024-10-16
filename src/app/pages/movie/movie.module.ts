import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MovieDetailPage } from './movie-detail/movie-detail.page';
import { CommentWritePage } from './movie-comment/comment-write/comment-write.page';
import { MoviePageRoutingModule } from './movie-routing.module';
import { SearchPage } from './movie-search/search.page';
import { MovieFavoritePage } from './movie-favorite/movie-favorite.page';
import {CommentListPage} from "./movie-comment/comment-list/comment-list.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviePageRoutingModule,
  ],

  declarations:
    [
      CommentWritePage,
      MovieDetailPage,
      SearchPage,
      CommentListPage,
      MovieFavoritePage]

})
export class MovieModule {}
