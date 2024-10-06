import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'movie',
    loadChildren: () => import('./pages/movie/movie.module').then(m => m.MovieModule)
  },
  {
    path: 'movie-favorite',
    loadChildren: () => import('./pages/movie/movie.module').then(m => m.MovieModule)
  },

  {
    path: 'collection',
    loadChildren: () => import('./pages/collection/collection.module').then(m => m.CollectionPageModule)
  },
  {
    path: 'mypage',
    loadChildren: () => import('./pages/auth/mypage/mypage.module').then(m => m.MypagePageModule) // 올바른 경로로 수정
  },
  {
    path: 'mypage',
    loadChildren: () => import('./pages/auth/mypage/mypage.module').then(m => m.MypagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
