import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadCollectionPageRoutingModule } from './upload-collection-routing.module';

import { UploadCollectionPage } from './upload-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadCollectionPageRoutingModule
  ],
  declarations: [UploadCollectionPage]
})
export class UploadCollectionPageModule {}
