import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionAddPage } from './collection-add.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionAddPageRoutingModule {}
