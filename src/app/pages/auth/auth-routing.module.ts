import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { CreateAccountPage } from './create-account/create-account.page';
import { MypagePage } from './mypage/mypage.page';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPage
  },
  {
    path: 'create-account', component: CreateAccountPage
  },
  {
    path: 'mypage', component: MypagePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
