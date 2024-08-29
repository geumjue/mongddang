import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingTab3PageRoutingModule } from './rating-tab3-routing.module';

import { RatingTab3Page } from './rating-tab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingTab3PageRoutingModule
  ],
  declarations: [RatingTab3Page]
})
export class RatingTab3PageModule {}
