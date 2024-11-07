import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CollectionPageRoutingModule } from './collection-routing.module';
import { CollectionPage } from './listing-collection/collection.page';
import { UploadCollectionPage } from './upload-collection/upload-collection.page';
import {DetailCollectionPage} from "./detail-collection/detail-collection.page";
import {AddCollectionPage} from "./add-collection/add-collection.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionPageRoutingModule,
  ],
  declarations: [CollectionPage, UploadCollectionPage, DetailCollectionPage, AddCollectionPage]
})
export class CollectionPageModule {}
