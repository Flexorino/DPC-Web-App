import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolusCalculatorButtonComponent } from './bolus-calculator-button.component';

describe('BolusCalculatorButtonComponent', () => {
  let component: BolusCalculatorButtonComponent;
  let fixture: ComponentFixture<BolusCalculatorButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolusCalculatorButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolusCalculatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
