import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOverviewComponent } from './add-overview.component';

describe('AddOverviewComponent', () => {
  let component: AddOverviewComponent;
  let fixture: ComponentFixture<AddOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
