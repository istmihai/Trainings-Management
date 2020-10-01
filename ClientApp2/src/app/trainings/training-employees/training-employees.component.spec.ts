import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEmployeesComponent } from './training-employees.component';

describe('TrainingEmployeesComponent', () => {
  let component: TrainingEmployeesComponent;
  let fixture: ComponentFixture<TrainingEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
