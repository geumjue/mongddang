import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsTab4PageRoutingModule } from './news-tab4-routing.module';

import { NewsTab4Page } from './news-tab4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsTab4PageRoutingModule
  ],
  declarations: [NewsTab4Page]
})
export class NewsTab4PageModule {}
