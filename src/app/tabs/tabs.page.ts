import { Component, OnInit } from '@angular/core';
import { AuthService} from "../services/auth.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  public showAdditionalTabs: boolean=false;

  constructor(private  authService: AuthService) {}

  ngOnInit() {
    // this.showAdditionalTabs = this.authService.isLoggedIn();
    // console.log('TabsPage initialized');
    this.authService.getLoginStatus().subscribe(isLoggedIn => {
      this.showAdditionalTabs = isLoggedIn;
      console.log('showAdditionalTabs:', this.showAdditionalTabs);
    });
  }

}
