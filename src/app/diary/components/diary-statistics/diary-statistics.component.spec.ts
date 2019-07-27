import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryStatisticsComponent } from './diary-statistics.component';

describe('DiaryStatisticsComponent', () => {
  let component: DiaryStatisticsComponent;
  let fixture: ComponentFixture<DiaryStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
