import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPickerComponent } from './add-entry-food-selection-decider.component';

describe('FoodPickerComponent', () => {
  let component: FoodPickerComponent;
  let fixture: ComponentFixture<FoodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
