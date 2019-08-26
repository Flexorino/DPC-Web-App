import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FramevalueShowerComponent } from './framevalue-shower.component';

describe('FramevalueShowerComponent', () => {
  let component: FramevalueShowerComponent;
  let fixture: ComponentFixture<FramevalueShowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FramevalueShowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramevalueShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
