import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryNavComponent } from './diary-nav.component';

describe('DiaryNavComponent', () => {
  let component: DiaryNavComponent;
  let fixture: ComponentFixture<DiaryNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
