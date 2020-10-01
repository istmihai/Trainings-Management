import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDeleteComponent } from './training-delete.component';

describe('TrainingDeleteComponent', () => {
  let component: TrainingDeleteComponent;
  let fixture: ComponentFixture<TrainingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
