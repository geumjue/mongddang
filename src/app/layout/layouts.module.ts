import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { HeaderPage } from './header/header.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  declarations: [HeaderPage, TabsPage],
  exports: [
    HeaderPage,
    TabsPage,
  ]
})
export class LayoutsModule {}
