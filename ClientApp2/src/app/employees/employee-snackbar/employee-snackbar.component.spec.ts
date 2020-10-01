import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSnackbarComponent } from './employee-snackbar.component';

describe('EmployeeSnackbarComponent', () => {
  let component: EmployeeSnackbarComponent;
  let fixture: ComponentFixture<EmployeeSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
