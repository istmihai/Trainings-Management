import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsGeneralComponent } from './charts-general.component';

describe('ChartsGeneralComponent', () => {
  let component: ChartsGeneralComponent;
  let fixture: ComponentFixture<ChartsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
