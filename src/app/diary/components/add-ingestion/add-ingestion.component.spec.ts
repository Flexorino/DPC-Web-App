import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngestionComponent } from './add-ingestion.component';

describe('AddIngestionComponent', () => {
  let component: AddIngestionComponent;
  let fixture: ComponentFixture<AddIngestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIngestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
