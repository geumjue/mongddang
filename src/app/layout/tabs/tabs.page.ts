// import { Component, OnInit } from '@angular/core';
// import { AuthService} from "../services/auth.service";
//
// @Component({
//   selector: 'app-tabs',
//   templateUrl: 'tabs.page.html',
//   styleUrls: ['tabs.page.scss']
// })
// export class TabsPage implements OnInit{
//   public showAdditionalTabs: boolean=false;
//
//   constructor(private  authService: AuthService) {}
//
//   ngOnInit() {
//     // this.showAdditionalTabs = this.authService.isLoggedIn();
//     // console.log('TabsPage initialized');
//     this.authService.getLoginStatus().subscribe(isLoggedIn => {
//       this.showAdditionalTabs = isLoggedIn;
//       console.log('showAdditionalTabs:', this.showAdditionalTabs);
//     });
//   }
//
// }
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/services/auth.service";
import { BehaviorSubject } from 'rxjs';  // BehaviorSubject import

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  selectedTab: string = 'home'; // 기본 탭 설정

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  public showAdditionalTabs: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // 로그인 상태를 구독하여 탭 표시 여부 결정
    this.authService.getLoginStatus().subscribe((isLoggedIn: boolean) => {
      this.showAdditionalTabs = isLoggedIn;
      console.log('showAdditionalTabs:', this.showAdditionalTabs);
    });
  }
}

