import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingChartComponent } from './training-chart.component';

describe('TrainingChartComponent', () => {
  let component: TrainingChartComponent;
  let fixture: ComponentFixture<TrainingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
