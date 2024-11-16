import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NowsCommentPage } from './nows-comment/nows-comment.page';
import { IonicModule } from '@ionic/angular';
import { RecommendationPage } from './recommendation/recommendation.page';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NowsCommentPage,RecommendationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
