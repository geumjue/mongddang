//home-routing.page
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {NowsCommentPage} from "./nows-comment/nows-comment.page";
import {MovieDetailPage} from "../movie/movie-detail/movie-detail.page";
import {SearchPage} from "../movie/movie-search/search.page";
import { RecommendationPage } from './recommendation/recommendation.page';


const routes: Routes = [
  {
    path: '', component: HomePage,
  },
  {
    path: 'nows-comment', component: NowsCommentPage,
  },
  {
    path: 'movie-detail', component: MovieDetailPage,
  },
  {
    path: 'search', component: SearchPage,
  },
  {
    path: 'recommendation', component: RecommendationPage 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
