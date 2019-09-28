import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryNamePopUpComponent } from './diary-name-pop-up.component';

describe('DiaryNamePopUpComponent', () => {
  let component: DiaryNamePopUpComponent;
  let fixture: ComponentFixture<DiaryNamePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryNamePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryNamePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
