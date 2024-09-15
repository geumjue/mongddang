// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { Tab3Page } from './tab3.page';
//
// const routes: Routes = [
//   {
//     path: '',
//     component: Tab3Page,
//   }
// ];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class Tab3PageRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';
import {CreateAccountPage} from "../create-account/create-account.page";

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'create-account',
    component: CreateAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}



