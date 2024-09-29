import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { CreateAccountPage } from './create-account/create-account.page';
import { LoginPage } from './login/login.page';
import { MypagePage } from './mypage/mypage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule
  ],
  declarations: [LoginPage, CreateAccountPage, MypagePage]
})
export class AuthModule { }
