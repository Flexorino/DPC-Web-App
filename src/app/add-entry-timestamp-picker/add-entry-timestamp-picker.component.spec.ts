import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryTimestampPickerComponent } from '../diary/components/add-entry-components/inputs/components/add-entry-timestamp-picker/add-entry-timestamp-picker.component';

describe('AddEntryTimestampPickerComponent', () => {
  let component: AddEntryTimestampPickerComponent;
  let fixture: ComponentFixture<AddEntryTimestampPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntryTimestampPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryTimestampPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
