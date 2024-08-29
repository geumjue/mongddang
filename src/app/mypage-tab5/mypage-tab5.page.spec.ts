import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MypageTab5Page } from './mypage-tab5.page';

describe('MypageTab5Page', () => {
  let component: MypageTab5Page;
  let fixture: ComponentFixture<MypageTab5Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageTab5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
