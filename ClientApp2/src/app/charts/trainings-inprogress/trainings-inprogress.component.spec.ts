import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsInprogressComponent } from './trainings-inprogress.component';

describe('TrainingsInprogressComponent', () => {
  let component: TrainingsInprogressComponent;
  let fixture: ComponentFixture<TrainingsInprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsInprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsInprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
