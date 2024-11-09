import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionPage } from './listing-collection/collection.page';
import {UploadCollectionPage} from "./upload-collection/upload-collection.page";
import {DetailCollectionPage} from "./detail-collection/detail-collection.page";
import {AddCollectionPage} from "./add-collection/add-collection.page";

const routes: Routes = [
  {
    path: '', component: CollectionPage
  },
  {
    path: 'upload-collection', component: UploadCollectionPage,
  },
  {
    path: 'detail-collection', component: DetailCollectionPage,
  },
  {
    path: 'add-collection', component: AddCollectionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionPageRoutingModule {}
