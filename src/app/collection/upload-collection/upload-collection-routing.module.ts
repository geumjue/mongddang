import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadCollectionPage } from './upload-collection.page';

const routes: Routes = [
  {
    path: '',
    component: UploadCollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadCollectionPageRoutingModule {}
