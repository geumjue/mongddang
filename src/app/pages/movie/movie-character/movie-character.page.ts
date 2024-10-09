import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-movie-character',
  templateUrl: './movie-character.page.html',
  styleUrls: ['./movie-character.page.scss'],
})
export class MovieCharacterPage implements OnInit {

  constructor(private route: Router, private activateRoute: ActivatedRoute) { }


  // goBackMovieDetailPage() {
  //   this.route.navigate(['/movie/detail']);
  // }

  ngOnInit() {
  }

}
