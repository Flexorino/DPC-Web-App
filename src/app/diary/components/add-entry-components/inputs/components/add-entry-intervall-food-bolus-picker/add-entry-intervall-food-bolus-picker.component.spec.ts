import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryIntervallFoodBolusPickerComponent } from './add-entry-intervall-food-bolus-picker.component';

describe('AddEntryIntervallFoodBolusPickerComponent', () => {
  let component: AddEntryIntervallFoodBolusPickerComponent;
  let fixture: ComponentFixture<AddEntryIntervallFoodBolusPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntryIntervallFoodBolusPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryIntervallFoodBolusPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
