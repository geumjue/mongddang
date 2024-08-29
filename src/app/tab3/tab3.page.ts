// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-tab3',
//   templateUrl: 'tab3.page.html',
//   styleUrls: ['tab3.page.scss']
// })
// export class Tab3Page {
//
//   constructor() {}
//
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from "../services/auth.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(); //로그인 상태
    console.log('User logged in');
    this.router.navigate(['/tabs/tab1']);
  }

  // logout() {
  //   this.authService.logout(); // 로그아웃 상태로 설정
  //   console.log('User logged out');
  //   this.router.navigate(['/tabs/tab3']); // 로그아웃 후 로그인 페이지로 라우팅
  // }


  goToCreateAccountPage() {
    this.router.navigate(['/tabs/tab3/create-account']);
  }

}


