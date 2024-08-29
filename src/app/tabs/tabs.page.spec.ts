// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { TabsPage } from './tabs.page';
//
// describe('TabsPage', () => {
//   let component: TabsPage;
//   let fixture: ComponentFixture<TabsPage>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [TabsPage],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(TabsPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsPage } from './tabs.page';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabsPage],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => true, // 변경 사항에 따라 true/false로 조정
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show additional tabs if logged in', () => {
    // Set up authService to return true (logged in)
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    const tabButtons = fixture.debugElement.queryAll(By.css('ion-tab-button'));
    expect(tabButtons.length).toBeGreaterThan(3); // Assuming there are more than 3 tabs when logged in
  });

  it('should show only login tab if not logged in', () => {
    // Set up authService to return false (not logged in)
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    component.ngOnInit();
    fixture.detectChanges();
    const tabButtons = fixture.debugElement.queryAll(By.css('ion-tab-button'));
    expect(tabButtons.length).toBe(3); // Only 3 tabs expected
  });
});
