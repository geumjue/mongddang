import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  selectedTab: string = 'home'; // 기본 탭 설정
  public showAdditionalTabs: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // 로그인 상태를 구독하여 탭 표시 여부 결정
    this.authService.getLoginStatus().subscribe((isLoggedIn: boolean) => {
      this.showAdditionalTabs = isLoggedIn; // 로그인 상태에 따라 추가 탭 표시
      console.log('showAdditionalTabs:', this.showAdditionalTabs);
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab; // 선택한 탭 설정
  }

  goToMyPage() {
    this.selectedTab = 'mypage'; // 마이페이지로 이동 시 선택된 탭을 'mypage'로 설정
    // 추가적으로 마이페이지로 라우팅하는 코드를 여기에 추가할 수 있음
    // this.router.navigate(['/mypage']); // 필요하다면 주석 해제
  }
}
