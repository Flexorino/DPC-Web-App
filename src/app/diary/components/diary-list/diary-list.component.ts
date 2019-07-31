import { Diary } from './../../../../shared/model/redux/Diary';
import { Store, select } from '@ngrx/store';
import { EntryService } from './../../../../shared/services/entry.service';
import { EintrgeService } from './../../../../web-api/api/eintrge.service';
import { EntryAttributeTypes } from './../../../../shared/model/diary/entry/entry-attribute-types';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaseEntryAttribute } from 'src/shared/model/diary/entry/base-entry-attribute';
import { openList, closed } from './diary-list.actions';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnInit, OnDestroy {

  public dayMappedEntries = [];

  public graphViewActivated = false;
  private entrySubscription: Subscription;

  ngOnDestroy(): void {
    this.store.dispatch(closed());
    this.entrySubscription.unsubscribe();
  }
  ngOnInit(): void {
    let x = this.store.pipe(select('diary')).pipe(tap(x => console.log(x)), map(x => {
      return this.entryService.mapEntriesToDays(x.loadedEntries);
    }, tap(x => console.log(x)))).subscribe(
      x => {
        this.dayMappedEntries = x
      }
    );
    this.store.dispatch(openList());
    this.entrySubscription = x;
  }

  constructor(private entryService: EntryService, private store: Store<{ diary: Diary }>) { }



}
