import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTrainingsFilterComponent } from './employee-trainings-filter.component';

describe('EmployeeTrainingsFilterComponent', () => {
  let component: EmployeeTrainingsFilterComponent;
  let fixture: ComponentFixture<EmployeeTrainingsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTrainingsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTrainingsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
