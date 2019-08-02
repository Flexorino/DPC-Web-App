import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollViewComponent } from './coll-view.component';

describe('CollViewComponent', () => {
  let component: CollViewComponent;
  let fixture: ComponentFixture<CollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
