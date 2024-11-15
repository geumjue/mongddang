import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-detail-collection',
  templateUrl: './detail-collection.page.html',
  styleUrls: ['./detail-collection.page.scss'],
})
export class DetailCollectionPage implements OnInit {
  collection: any; // 컬렉션 데이터
  collectionId: number| null = null;; // URL에서 컬렉션 ID 가져오기

  constructor(
    private activatedRoute: ActivatedRoute,
    private collectionService: CollectionService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    // URL에서 컬렉션 ID 가져오기
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.collectionId = parseInt(id, 10); // string을 number로 변환
      this.loadCollection();
    } else {
      console.error('컬렉션 ID가 존재하지 않습니다.');
    }
  }

  loadCollection() {
    if (this.collectionId !== null) { // null 체크
      this.collectionService.getCollectionById(this.collectionId).subscribe(
        (data) => {
          this.collection = data;
        },
        (error) => {
          console.error('컬렉션을 불러오는 데 실패했습니다.', error);
        }
      );
    } else {
      console.error('컬렉션 ID가 유효하지 않습니다.');
    }
  }
}
