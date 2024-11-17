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
import { tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  collections: any[] = [];
  sharedCollections$ = this.collectionService.getSharedCollections(); // Observable로 처리

  constructor(
    private router: Router,
    private collectionService: CollectionService,
    private navController: NavController
  ) {
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
  }

  ngOnInit() {
    this.loadCollections();
    this.sharedCollections$ = this.collectionService.getSharedCollections();
  }

  loadCollections() {
    this.collections = [
      { id: 1, name: '크리스마스에 생각나는 영화', favoriteCount: 326 },
      { id: 2, name: '천만 돌파한 한국 영화는 뭐가 있을까?', favoriteCount: 220 },
      { id: 3, name: '웹툰 원작 영화 컬렉션', favoriteCount: 104 },
    ];
  }

  goToUploadCollectionPage() {
    this.router.navigate(['collection/upload-collection']);
  }

  goToDetailCollectionPage(id: number) {
    this.router.navigate([`collection/detail-collection/${id}`]);
  }

  shareCollection(collectionId: number) {
    this.collectionService.shareCollection(collectionId).pipe(
      tap((response) => {
        console.log('컬렉션 공유 성공:', response);
        // 공유된 컬렉션을 리스트에 추가
        this.sharedCollections$.subscribe((sharedCollections) => {
          sharedCollections.push(response);
        });
      })
    ).subscribe(
      (response) => console.log('공유된 컬렉션:', response),
      (error) => console.error('컬렉션 공유 실패:', error)
    );
  }

  viewDetail(collectionId: number) {
    this.navController.navigateForward(`/detail-collection/${collectionId}`);
  }
}
