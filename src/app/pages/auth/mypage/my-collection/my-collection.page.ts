import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CollectionService } from 'src/app/services/collection/collection.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.page.html',
  styleUrls: ['./my-collection.page.scss'],
})
export class MyCollectionPage {
  collections: any[] = [];

  constructor(
    private collectionService: CollectionService,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    this.loadCollections();
  }

  loadCollections() {
    this.collectionService.getCollections().subscribe((data) => {
      this.collections = data;
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

  viewDetail(collectionId: number) {
    this.navController.navigateForward(`/detail-collection/${collectionId}`);
  }
}
