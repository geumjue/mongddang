import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-account',
    loadChildren: () => import('./auth/create-account/create-account.module').then(m => m.CreateAccountPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mypage',
    loadChildren: () => import('./mypage/mypage.module').then(m => m.MypagePageModule)

  },
  {
    path: 'nows-comment',
    loadChildren: () => import('./comment/nows-comment/nows-comment.module').then(m => m.NowsCommentPageModule)
  },

  {
    path: 'movie-detail',
    loadChildren: () => import('./movie/movie-detail/movie-detail.module').then(m => m.MovieDetailPageModule)
  },
  {
    path: 'comment-write',
    loadChildren: () => import('./comment/comment-write/comment-write.module').then(m => m.CommentWritePageModule)
  },
  {
    path: 'collection',
    loadChildren: () => import('./collection/collection.module').then( m => m.CollectionPageModule)
  },
  {
    path: 'actor-list',
    loadChildren: () => import('./actor-list/actor-list.module').then(m => m.ActorListPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
