import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  // HTTP_INTERCEPTORS import 추가
import { LayoutsModule } from './layout/layouts.module';
import { HomePageModule } from './pages/home/home.module';
import { CollectionPageModule } from "./pages/collection/collection.module";
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { ChatbotPage } from './pages/chatbot/chatbot.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,ChatbotPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule,
    HttpClientModule,
    LayoutsModule,
    HomePageModule,
    CollectionPageModule,
    FormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,  // HTTP_INTERCEPTORS를 등록
      useClass: AuthInterceptor,   // AuthInterceptor를 사용
      multi: true,                 // 여러 인터셉터를 사용할 수 있도록 설정
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
