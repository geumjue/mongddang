import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsTab4Page } from './news-tab4.page';

describe('NewsTab4Page', () => {
  let component: NewsTab4Page;
  let fixture: ComponentFixture<NewsTab4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
