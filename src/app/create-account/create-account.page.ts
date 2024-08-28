import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

  }

  goBackLoginPage() {
    this.router.navigate(['/tabs/tab3']); // 로그인 페이지로 이동합니다

  }
}
