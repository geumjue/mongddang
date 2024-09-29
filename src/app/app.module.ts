import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // HttpClient 모듈 추가
import { LayoutsModule } from './layout/layouts.module';
import { HomePageModule } from './home/home.module';
// import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode:'ios'}),
    AppRoutingModule,
    // SwiperModule,
    HttpClientModule,
    LayoutsModule,
    HomePageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
