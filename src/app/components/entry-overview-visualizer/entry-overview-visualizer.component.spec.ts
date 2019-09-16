import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryOverviewVisualizerComponent } from './entry-overview-visualizer.component';

describe('EntryOverviewVisualizerComponent', () => {
  let component: EntryOverviewVisualizerComponent;
  let fixture: ComponentFixture<EntryOverviewVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryOverviewVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryOverviewVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
