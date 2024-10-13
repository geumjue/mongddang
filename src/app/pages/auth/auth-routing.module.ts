import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { CreateAccountPage } from './create-account/create-account.page';
import { MypagePage } from './mypage/mypage.page';
import {LikedMoviePage} from "./mypage/liked-movie/liked-movie.page";
import {LikedCollectionPage} from "./mypage/liked-collection/liked-collection.page";
import {LikedCommentPage} from "./mypage/liked-comment/liked-comment.page";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPage
  },
  {
    path: 'create-account', component: CreateAccountPage
  },
  {
    path: 'mypage', component: MypagePage
  },
  {
    path: 'mypage/liked-movie', component: LikedMoviePage
  },
  {
    path: 'mypage/liked-collection', component: LikedCollectionPage
  },
  {
    path: 'mypage/liked-comment', component: LikedCommentPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
