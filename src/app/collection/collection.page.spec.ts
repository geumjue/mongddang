import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionPage } from './collection.page';

describe('RatingTab3Page', () => {
  let component: CollectionPage;
  let fixture: ComponentFixture<CollectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
