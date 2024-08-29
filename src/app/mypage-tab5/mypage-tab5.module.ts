import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypageTab5PageRoutingModule } from './mypage-tab5-routing.module';

import { MypageTab5Page } from './mypage-tab5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypageTab5PageRoutingModule
  ],
  declarations: [MypageTab5Page]
})
export class MypageTab5PageModule {}
