import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GetCollectionsResponseData } from "src/app/models/collection/collection-getcollections.interface.data";
import { PostCollectionRequestData } from "src/app/models/collection/collection-postcollection.interface.data";
import { CollectionService } from "src/app/services/collection/collection.service";

@Component({
    selector: 'app-collection-add',
    templateUrl: './collection-add.page.html',
    styleUrls: ['./collection-add.page.scss']
})

export class CollectionAddPage implements OnInit {
    collections: GetCollectionsResponseData[] = [];
    newCollectionName: string = '';
    showNewCollectionInput: boolean = false; // 입력란 표시 여부
  
    constructor(
      private collectionService: CollectionService,
      private router: Router,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit() {
      this.getCollections();
    }
  
    getCollections() {
      this.collectionService.getCollections().subscribe({
        next: (collections) => {
          this.collections = collections;
        },
        error: (err) => {
          console.error('컬렉션 가져오기 오류:', err);
        }
      });
    }
    createCollection() {
      if (!this.newCollectionName) {
        alert('컬렉션 이름을 입력하세요!');
        return;
      }
    
      const newCollection: PostCollectionRequestData = {
        name: this.newCollectionName,
        movieIds: [], // 기본값으로 빈 배열 할당
        userIds: []   // 기본값으로 빈 배열 할당
      };
    
      this.collectionService.createCollection(newCollection).subscribe({
        next: () => {
          alert('컬렉션이 생성되었습니다!');
          this.getCollections();
          this.newCollectionName = '';
          this.showNewCollectionInput = false; // 입력란 숨기기
        },
        error: (err) => {
          console.error('컬렉션 생성 중 오류:', err);
          alert('컬렉션 생성에 실패했습니다. 다시 시도해 주세요!'); // 사용자에게 피드백 추가
        }
      });
    }
    
    
  
    addMovieToCollection(collectionId: number) {
      const movieId = this.route.snapshot.params['id'];
      this.collectionService.addMovieToCollection(collectionId, movieId).subscribe({
        next: () => {
          alert('영화가 컬렉션에 추가되었습니다!');
        },
        error: (err) => {
          console.error('영화를 컬렉션에 추가하는 중 오류:', err);
        }
      });
    }
  
    goBack() {
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
