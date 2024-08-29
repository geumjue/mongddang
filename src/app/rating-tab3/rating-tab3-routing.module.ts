import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingTab3Page } from './rating-tab3.page';

const routes: Routes = [
  {
    path: '',
    component: RatingTab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingTab3PageRoutingModule {}
