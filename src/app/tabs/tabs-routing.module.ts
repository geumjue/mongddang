import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'rating-tab3',
        loadChildren: () => import('../rating-tab3/rating-tab3.module').then(m => m.RatingTab3PageModule)
      },
      {
        path: 'news-tab4',
        loadChildren: () => import('../news-tab4/news-tab4.module').then(m => m.NewsTab4PageModule)
      },
      {
        path: 'mypage-tab5',
        loadChildren: () => import('../mypage-tab5/mypage-tab5.module').then(m => m.MypageTab5PageModule)
      },
      {
        path: 'comment-write',
        loadChildren: () => import('../comment-write/comment-write.module').then(m => m.CommentWritePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
