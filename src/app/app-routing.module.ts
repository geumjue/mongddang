import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: 'create-account',
    loadChildren: () => import('./auth/create-account/create-account.module').then(m => m.CreateAccountPageModule)
  },
  {
    path: '', component: HomePage
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
    path: 'upload-collection',
    loadChildren: () => import('./collection/upload-collection/upload-collection.module').then(m => m.UploadCollectionPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
