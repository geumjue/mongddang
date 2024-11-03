import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router"; // Router와 ActivatedRoute 임포트 추가

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.page.html',
  styleUrls: ['./add-collection.page.scss'],
})
export class AddCollectionPage {
  constructor(private route: Router, private activeRoute: ActivatedRoute) {} // 생성자에서 의존성 주입

  goBackMovieDetail() {
    const movieId = this.activeRoute.snapshot.params['id']; // ActiveRoute를 activeRoute로 수정
    this.route.navigate([`movie/detail/${movieId}`]);
  }
}
