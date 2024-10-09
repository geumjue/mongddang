import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  selectedTab: string = 'home'; // 초기 선택된 탭
  public showAdditionalTabs: boolean = false; // 추가 탭 표시 여부

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // 로그인 상태를 구독하여 탭 표시 여부 결정
    this.authService.getLoginStatus().subscribe((isLoggedIn: boolean) => {
      this.showAdditionalTabs = isLoggedIn; // 로그인 상태에 따라 추가 탭 표시
      if (isLoggedIn) {
        this.selectedTab = 'mypage'; // 로그인 상태일 때 선택된 탭
      } else {
        this.selectedTab = 'home'; // 로그인하지 않은 상태일 때 기본 탭
      }
      console.log('showAdditionalTabs:', this.showAdditionalTabs);
      console.log('selectedTab:', this.selectedTab);
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab; // 선택된 탭 설정
  }

  logOut() {
    this.authService.logOut().subscribe(response => {
      if (response.success) {
        this.showAdditionalTabs = false; // 로그아웃 시 추가 탭 숨기기
        this.selectedTab = 'home'; // 로그아웃 시 홈 탭 선택
        this.router.navigate(['/']); // 메인 페이지로 리다이렉트
      }
    });
  }
}
