import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsTab4Page } from './news-tab4.page';

const routes: Routes = [
  {
    path: '',
    component: NewsTab4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsTab4PageRoutingModule {}
