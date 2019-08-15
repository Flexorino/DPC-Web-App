import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFullScreenModalComponent } from './base-full-screen-modal.component';

describe('BaseFullScreenModalComponent', () => {
  let component: BaseFullScreenModalComponent;
  let fixture: ComponentFixture<BaseFullScreenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseFullScreenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFullScreenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
