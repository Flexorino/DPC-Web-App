import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBSMeasureComponent } from './add-bsmeasure.component';

describe('AddBSMeasureComponent', () => {
  let component: AddBSMeasureComponent;
  let fixture: ComponentFixture<AddBSMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBSMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBSMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
