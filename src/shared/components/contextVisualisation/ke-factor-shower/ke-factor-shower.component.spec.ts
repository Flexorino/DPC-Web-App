import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeFactorShowerComponent } from './ke-factor-shower.component';

describe('KeFactorShowerComponent', () => {
  let component: KeFactorShowerComponent;
  let fixture: ComponentFixture<KeFactorShowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeFactorShowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeFactorShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
