import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionAddPage } from './collection-add.page';

describe('CollectionAddPage', () => {
  let component: CollectionAddPage;
  let fixture: ComponentFixture<CollectionAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
