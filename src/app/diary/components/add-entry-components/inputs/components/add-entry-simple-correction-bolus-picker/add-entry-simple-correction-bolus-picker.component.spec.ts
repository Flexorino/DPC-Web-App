import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntrySimpleCorrectionBolusPickerComponent } from './add-entry-simple-correction-bolus-picker.component';

describe('AddEntrySimpleCorrectionBolusPickerComponent', () => {
  let component: AddEntrySimpleCorrectionBolusPickerComponent;
  let fixture: ComponentFixture<AddEntrySimpleCorrectionBolusPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntrySimpleCorrectionBolusPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntrySimpleCorrectionBolusPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
