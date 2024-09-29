import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActorListPage } from './actor-list.page';

describe('ActorListPage', () => {
  let component: ActorListPage;
  let fixture: ComponentFixture<ActorListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
