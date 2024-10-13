import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MypagePage } from './mypage.page';
import {LikedMoviePage} from "./liked-movie/liked-movie.page";
import {LikedCollectionPage} from "./liked-collection/liked-collection.page";
import {LikedCommentPage} from "./liked-comment/liked-comment.page";

const routes: Routes = [
  {
    path: '',
    component: MypagePage
  },

  {
    path: 'liked-movie',
    component: LikedMoviePage
  },

  {
    path: 'liked-collection',
    component: LikedCollectionPage
  },

  {
    path: 'liked-comment',
    component: LikedCommentPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MypagePageRoutingModule {}
