import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NowsCommentPageRoutingModule } from './nows-comment-routing.module';

import { NowsCommentPage } from './nows-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NowsCommentPageRoutingModule
  ],
  declarations: [NowsCommentPage]
})
export class NowsCommentPageModule {}
