import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentWritePageRoutingModule } from './comment-write-routing.module';
import { CommentWritePage } from './comment-write.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentWritePageRoutingModule
  ],
  declarations: [CommentWritePage]
})
export class CommentWritePageModule {}
