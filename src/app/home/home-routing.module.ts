import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {NowsCommentPage} from "../comment/nows-comment/nows-comment.page";
import {MovieDetailPage} from "../movie/movie-detail/movie-detail.page";
import {SearchPage} from "../search/search.page";


const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {

    path: 'nows-comment',
    component: NowsCommentPage,
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
export class HomePageRoutingModule {}
