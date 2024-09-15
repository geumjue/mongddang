import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../../auth/login/login.module').then(m => m.LoginPageModule)
      },
      // {
      //   path: 'collection',
      //   loadChildren: () => import('../../collection/collection.module').then(m => m.CollectionPageModule)
      // },
      {
        path: 'mypage',
        loadChildren: () => import('../../mypage/mypage.module').then(m => m.MypagePageModule)
      },
      {
        path: 'comment-write',
        loadChildren: () => import('../../comment/comment-write/comment-write.module').then(m => m.CommentWritePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
