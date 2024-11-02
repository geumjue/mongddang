import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage {
  password: string = '';
  userId: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.userId = this.authService.getUserIdFromToken(); // 사용자 ID 가져오기
  }

  onSubmit() {
    if (this.password) {
      this.authService.deleteAccount(this.password)
        .then(() => {
          console.log('Account deleted successfully');
          
          // 홈 페이지로 이동 후 페이지 새로고침
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        })
        .catch((error: Error) => { // Error 타입으로 수정
          console.error('Error deleting account:', error.message);
        });
    } else {
      console.warn('Password is required for account deletion');
    }
  }
}
