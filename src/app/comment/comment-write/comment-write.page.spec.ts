import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentWritePage } from './comment-write.page';

describe('CommentWritePage', () => {
  let component: CommentWritePage;
  let fixture: ComponentFixture<CommentWritePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentWritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
