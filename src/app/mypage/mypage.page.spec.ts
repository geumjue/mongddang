import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MypagePage } from './mypage.page';

describe('MypagePage', () => {
  let component: MypageTab5Page;
  let fixture: ComponentFixture<MypageTab5Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MypagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
