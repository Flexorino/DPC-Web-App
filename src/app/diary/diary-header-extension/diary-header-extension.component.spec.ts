import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryHeaderExtensionComponent } from './diary-header-extension.component';

describe('DiaryHeaderExtensionComponent', () => {
  let component: DiaryHeaderExtensionComponent;
  let fixture: ComponentFixture<DiaryHeaderExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryHeaderExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryHeaderExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
