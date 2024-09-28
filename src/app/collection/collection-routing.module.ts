import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionPage } from './collection.page';
import {CommentWritePage} from "../comment/comment-write/comment-write.page";
import {UploadCollectionPage} from "./upload-collection/upload-collection.page";

const routes: Routes = [
  {
    path: '',
    component: CollectionPage
  },
  {

    path: 'upload-collection',
    component: UploadCollectionPage,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionPageRoutingModule {}
