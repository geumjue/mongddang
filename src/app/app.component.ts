import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth/auth.service';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.authService.loadUserFromToken();  // 애플리케이션 초기화 시 사용자 정보 로드
  }
}
