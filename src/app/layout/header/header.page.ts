import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth/auth.service';
// import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss']
})
export class HeaderPage implements OnInit {
  userProfilePicture: string = '/assets/default-profile.png';
  isLoggedIn: boolean = false;

//   constructor(private authService: AuthService, private userService: UserService) {}
  constructor() {}

  ngOnInit(): void {

//     this.isLoggedIn = this.authService.isLoggedIn();
//     if (this.isLoggedIn) {
//       this.userProfilePicture = this.authService.getUserProfilePictureFromToken() || '/assets/default-profile.png';
//     }
//   }
    }
}
