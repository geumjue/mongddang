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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password) {
      this.authService.deleteAccount(this.password).subscribe(
        () => {
          console.log('Account deleted successfully');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error deleting account:', error);
        }
      );
    }
  }
}