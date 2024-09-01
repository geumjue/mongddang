// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//
// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
//   },
//   {
//     path: 'login',
//     loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
//   },
//   {
//     path: 'create-account',
//     loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
//   },
//   {
//     path: 'account',
//     loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
//   }
//
// ];
// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then(m => m.CreateAccountPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'series',
    loadChildren: () => import('./series/series.module').then( m => m.SeriesPageModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then(m => m.BookPageModule)
  },
  {
    path: 'rating-tab3',
    loadChildren: () => import('./rating-tab3/rating-tab3.module').then( m => m.RatingTab3PageModule)
  },
  {
    path: 'news-tab4',
    loadChildren: () => import('./news-tab4/news-tab4.module').then( m => m.NewsTab4PageModule)
  },
  {
    path: 'mypage-tab5',
    loadChildren: () => import('./mypage-tab5/mypage-tab5.module').then( m => m.MypageTab5PageModule)

  },
  {
    path: 'comment',
    loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule)
  }


  },
  {
    path: 'movie-detail',
    loadChildren: () => import('./movie-detail/movie-detail.module').then( m => m.MovieDetailPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
