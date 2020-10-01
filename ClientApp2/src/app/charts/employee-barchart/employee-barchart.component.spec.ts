import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBarchartComponent } from './employee-barchart.component';

describe('EmployeeBarchartComponent', () => {
  let component: EmployeeBarchartComponent;
  let fixture: ComponentFixture<EmployeeBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
