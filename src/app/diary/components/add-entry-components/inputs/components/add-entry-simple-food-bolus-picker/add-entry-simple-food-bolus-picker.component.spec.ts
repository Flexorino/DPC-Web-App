import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntrySimpleFoodBolusPickerComponent } from './add-entry-simple-food-bolus-picker.component';

describe('AddEntrySimpleFoodBolusPickerComponent', () => {
  let component: AddEntrySimpleFoodBolusPickerComponent;
  let fixture: ComponentFixture<AddEntrySimpleFoodBolusPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntrySimpleFoodBolusPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntrySimpleFoodBolusPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
