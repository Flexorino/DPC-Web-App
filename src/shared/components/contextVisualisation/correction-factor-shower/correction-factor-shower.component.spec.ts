import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionFactorShowerComponent } from './correction-factor-shower.component';

describe('CorrectionFactorShowerComponent', () => {
  let component: CorrectionFactorShowerComponent;
  let fixture: ComponentFixture<CorrectionFactorShowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionFactorShowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionFactorShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
