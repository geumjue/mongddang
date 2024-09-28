import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadCollectionPage } from './upload-collection.page';

describe('UploadCollectionPage', () => {
  let component: UploadCollectionPage;
  let fixture: ComponentFixture<UploadCollectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
