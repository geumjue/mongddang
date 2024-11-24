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
  router: any;

  constructor(
    private collectionService: CollectionService,
    private navController: NavController // 네비게이션 컨트롤러 주입
  ) {}

  ionViewWillEnter() {
    this.loadCollections();
  }

  loadCollections() {
    this.collectionService.getCollections().subscribe((data) => {
      this.collections = data;
    });
  }

  // 컬렉션 삭제 후 MyPage로 이동하는 메서드
  handleDeleteAndNavigate(collectionId: number) {
    this.collectionService.deleteCollection(collectionId).subscribe({
      next: () => {
        console.log(`컬렉션 ${collectionId} 삭제 성공`);
        this.navController.navigateRoot('/mypage/my-collection'); // 삭제 후 바로 MyPage로 이동
        setTimeout(() => {
          location.reload(); // 이동 후 페이지 새로고침
        }, 100); // 약간의 지연 후 새로고침
      },
      error: (err) => console.error('삭제 중 오류 발생:', err),
    });
  }  

  // 컬렉션 상세보기 페이지로 이동하는 메서드
  viewDetail(collectionId: number) {
    this.navController.navigateForward(`/detail-collection/${collectionId}`);
  }

  goBackMyPage () {
    this.router.navigate(['mypage/'])
  }
}