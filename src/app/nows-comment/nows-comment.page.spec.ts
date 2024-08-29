import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NowsCommentPage } from './nows-comment.page';

describe('NowsCommentPage', () => {
  let component: NowsCommentPage;
  let fixture: ComponentFixture<NowsCommentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NowsCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
