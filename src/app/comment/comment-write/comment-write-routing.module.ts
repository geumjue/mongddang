import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentWritePage } from './comment-write.page';

const routes: Routes = [
  {
    path: '',
    component: CommentWritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentWritePageRoutingModule {}
