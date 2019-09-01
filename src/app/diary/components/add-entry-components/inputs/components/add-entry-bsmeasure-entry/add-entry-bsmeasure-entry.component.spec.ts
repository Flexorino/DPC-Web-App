import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryBSMeasureEntryComponent } from './add-entry-bsmeasure-entry.component';

describe('AddEntryBSMeasureEntryComponent', () => {
  let component: AddEntryBSMeasureEntryComponent;
  let fixture: ComponentFixture<AddEntryBSMeasureEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntryBSMeasureEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryBSMeasureEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
