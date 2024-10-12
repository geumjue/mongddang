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
    // 로그인 상태 초기화
    this.authService.getLoginStatus().subscribe((isLoggedIn: boolean) => {
      this.updateTabs(isLoggedIn);
    });
  }

  updateTabs(isLoggedIn: boolean) {
    this.showAdditionalTabs = isLoggedIn; // 로그인 상태에 따라 추가 탭 표시
    this.selectedTab = isLoggedIn ? 'mypage' : 'login'; // 로그인 상태에 따른 선택된 탭 설정
  }

  selectTab(tab: string) {
    this.selectedTab = tab; // 선택된 탭 설정
  }

  logOut() {
    this.authService.logOut().subscribe(response => {
      if (response.success) {
        this.updateTabs(false); // 로그아웃 시 추가 탭 숨기기
        this.router.navigate(['/']); // 메인 페이지로 리다이렉트
      }
    });
  }
}

