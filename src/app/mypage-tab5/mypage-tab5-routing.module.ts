import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypageTab5Page } from './mypage-tab5.page';

const routes: Routes = [
  {
    path: '',
    component: MypageTab5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypageTab5PageRoutingModule {}
