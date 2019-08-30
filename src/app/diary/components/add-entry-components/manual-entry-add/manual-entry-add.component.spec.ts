import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEntryAddComponent } from './manual-entry-add.component';

describe('ManualEntryAddComponent', () => {
  let component: ManualEntryAddComponent;
  let fixture: ComponentFixture<ManualEntryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualEntryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualEntryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
