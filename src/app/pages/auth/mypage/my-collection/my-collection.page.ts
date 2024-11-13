import { Component } from '@angular/core';
import { CollectionService } from 'src/app/services/collection/collection.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.page.html',
  styleUrls: ['./my-collection.page.scss'],
})
export class MyCollectionPage {
  collections: any[] = [];

  constructor(private collectionService: CollectionService) {}

  ionViewWillEnter() {
    this.loadCollections();
  }

  loadCollections() {
    this.collectionService.getCollections().subscribe((data) => {
      this.collections = data; // 영화 포함한 컬렉션 데이터 할당
    });
  }

  deleteCollection(collectionId: number): void {
    if (confirm("정말 삭제하시겠습니까?")) {
      this.collectionService.deleteCollection(collectionId).subscribe(() => {
        this.collections = this.collections.filter((c) => c.id !== collectionId);
        alert("컬렉션이 삭제되었습니다!");
      });
    }
  }
}
