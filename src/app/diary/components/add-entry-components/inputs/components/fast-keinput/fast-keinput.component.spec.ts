import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastKEInputComponent } from './fast-keinput.component';

describe('FastKEInputComponent', () => {
  let component: FastKEInputComponent;
  let fixture: ComponentFixture<FastKEInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastKEInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastKEInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
