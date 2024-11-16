import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';
import { CollectionService } from 'src/app/services/collection/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  collections: any[] = [];
  sharedCollections: any[] = [];

  constructor(
    private router: Router,
    private collectionService: CollectionService
  ) {
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
  }

  ngOnInit() {
    this.loadCollections();
    this.loadSharedCollections(); // 공유된 컬렉션을 가져오는 메서드 호출
  }

  loadCollections() {
    // 임시 데이터 추가
    this.collections = [
      { id: 1, name: '크리스마스에 생각나는 영화', favoriteCount: 326 },
      { id: 2, name: '천만 돌파한 한국 영화는 뭐가 있을까?', favoriteCount: 220 },
      { id: 3, name: '웹툰 원작 영화 컬렉션', favoriteCount: 104 },
    ];
  }

  loadSharedCollections() {
    // 공유된 컬렉션을 서버에서 가져오는 API 호출
    this.collectionService.getSharedCollections().subscribe(
      (data) => {
        this.sharedCollections = data;
        console.log('공유된 컬렉션 데이터:', this.sharedCollections);
      },
      (error) => {
        console.error('공유된 컬렉션을 가져오는 데 실패했습니다.', error);
      }
    );
  }

  goToUploadCollectionPage() {
    this.router.navigate(['collection/upload-collection']);
  }

  goToDetailCollectionPage(id: number) {
    this.router.navigate([`collection/detail-collection/${id}`]);
  }

  shareCollection(collectionId: number) {
    // 컬렉션을 공유하는 API 호출
    this.collectionService.shareCollection(collectionId).subscribe(
      (response) => {
        console.log('컬렉션 공유 성공:', response);
        // 공유된 컬렉션을 리스트에 추가
        this.sharedCollections.push(response);
      },
      (error) => {
        console.error('컬렉션 공유 실패:', error);
      }
    );
  }
}
