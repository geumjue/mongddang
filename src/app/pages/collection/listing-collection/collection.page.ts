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
  sharedCollections$ = this.collectionService.getSharedCollections();

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
    this.collectionService.getCollections().subscribe(
      (collections: any[]) => {
        this.collections = collections.map((collection) => ({
          ...collection,
          isFavorite: collection.isFavorite || false, // 초기값 설정
          favoriteCount: collection.favoriteCount || 0, // 초기값 설정
        }));
      },
      (error) => {
        console.error('컬렉션 로딩 실패:', error);
      }
    );
  }

  toggleFavorite(collection: any) {
    collection.isFavorite = !collection.isFavorite;
    collection.favoriteCount += collection.isFavorite ? 1 : -1;

    // 서버에 업데이트 요청 (필요한 경우)
    this.collectionService.updateFavoriteStatus(collection.id, collection.isFavorite).subscribe(
      (response) => {
        console.log('하트 상태 업데이트 성공:', response);
      },
      (error) => {
        console.error('하트 상태 업데이트 실패:', error);
        // 실패 시 원래 상태로 복구
        collection.isFavorite = !collection.isFavorite;
        collection.favoriteCount += collection.isFavorite ? 1 : -1;
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