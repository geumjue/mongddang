import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { CollectionAddPage } from './collection-add.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CollectionAddPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CollectionAddPageModule {}
