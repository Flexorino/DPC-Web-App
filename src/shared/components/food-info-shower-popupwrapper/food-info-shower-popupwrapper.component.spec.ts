import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfoShowerPopupwrapperComponent } from './food-info-shower-popupwrapper.component';

describe('FoodInfoShowerPopupwrapperComponent', () => {
  let component: FoodInfoShowerPopupwrapperComponent;
  let fixture: ComponentFixture<FoodInfoShowerPopupwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodInfoShowerPopupwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodInfoShowerPopupwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
