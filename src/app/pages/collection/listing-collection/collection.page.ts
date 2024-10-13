import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { addIcons } from 'ionicons';
import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  constructor(private router: Router) {
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
  }

  ngOnInit() {
  }

  goToUploadCollectionPage() {
    this.router.navigate(['collection/upload-collection']);
  }
  goToDetailCollectionPage() {
    this.router.navigate(['collection/detail-collection']);
  }
}
