import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryFoodPickerComponent } from './add-entry-food-intake-list-picker.component';

describe('AddEntryFoodPickerComponent', () => {
  let component: AddEntryFoodPickerComponent;
  let fixture: ComponentFixture<AddEntryFoodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntryFoodPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryFoodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
