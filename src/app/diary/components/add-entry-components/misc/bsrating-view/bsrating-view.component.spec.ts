import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BSRatingViewComponent } from './bsrating-view.component';

describe('BSRatingViewComponent', () => {
  let component: BSRatingViewComponent;
  let fixture: ComponentFixture<BSRatingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BSRatingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BSRatingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
