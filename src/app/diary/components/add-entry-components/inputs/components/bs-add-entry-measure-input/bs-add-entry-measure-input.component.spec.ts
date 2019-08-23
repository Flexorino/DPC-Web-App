import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsAddEntryMeasureInputComponent } from './bs-add-entry-measure-input.component';

describe('BsAddEntryMeasureInputComponent', () => {
  let component: BsAddEntryMeasureInputComponent;
  let fixture: ComponentFixture<BsAddEntryMeasureInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsAddEntryMeasureInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsAddEntryMeasureInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
