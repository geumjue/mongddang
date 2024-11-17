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
    this.collectionService.getCollections().subscribe(
      (collections: any[]) => {
        this.collections = collections; // 서버에서 가져온 컬렉션 목록을 할당
      },
      (error) => {
        console.error('컬렉션 로딩 실패:', error);
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

  favoriteSharedCollection(collectionId: number) {
    this.collectionService.favoriteCollection(collectionId).subscribe(
      (response) => {
        console.log('즐겨찾기 성공:', response);
        // 즐겨찾기 후, 해당 컬렉션의 상태를 갱신
        const collection = this.collections.find(c => c.id === collectionId);
        if (collection) {
          collection.isFavorite = !collection.isFavorite;  // 상태 변경
        }
      },
      (error) => {
        console.error('즐겨찾기 실패:', error);
      }
    );
  }
}
