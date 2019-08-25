import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfoShowerComponent } from './food-info-shower.component';

describe('FoodInfoShowerComponent', () => {
  let component: FoodInfoShowerComponent;
  let fixture: ComponentFixture<FoodInfoShowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodInfoShowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodInfoShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
