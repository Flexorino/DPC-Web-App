import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodIntakeSummationComponent } from './food-intake-summation.component';

describe('FoodIntakeSummationComponent', () => {
  let component: FoodIntakeSummationComponent;
  let fixture: ComponentFixture<FoodIntakeSummationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodIntakeSummationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodIntakeSummationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
