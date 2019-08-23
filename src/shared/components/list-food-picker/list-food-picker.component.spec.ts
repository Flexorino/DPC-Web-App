import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodPickerComponent } from './list-food-picker.component';

describe('ListFoodPickerComponent', () => {
  let component: ListFoodPickerComponent;
  let fixture: ComponentFixture<ListFoodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFoodPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
