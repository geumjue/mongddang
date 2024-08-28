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

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private router: Router) {}

  goToCreateAccountPage() {
    this.router.navigate(['/tabs/tab3/create-account']);
  }

}


