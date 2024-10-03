import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // IonicModule 추가
import { MypagePage } from './mypage.page';
import { MypagePageRoutingModule } from './mypage-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // IonicModule 추가
    MypagePageRoutingModule
  ],
  declarations: [MypagePage]
})
export class MypagePageModule {}
