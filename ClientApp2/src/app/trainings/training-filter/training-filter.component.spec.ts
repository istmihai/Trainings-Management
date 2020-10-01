import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFilterComponent } from './training-filter.component';

describe('TrainingFilterComponent', () => {
  let component: TrainingFilterComponent;
  let fixture: ComponentFixture<TrainingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
