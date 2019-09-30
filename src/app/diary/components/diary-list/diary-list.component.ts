import { ActionUtil } from './../../../../shared/actions/ActionUtil';
import { ExtendedAction } from '../../../../shared/actions/ExtendedAction';
import { Store, select } from '@ngrx/store';
import { EntryService } from './../../../../shared/services/entry.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { map, tap, timestamp, takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { DiaryListActions } from './diary-list.actions';
import { Diary } from 'src/shared/model/diary/diary';


@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnInit, OnDestroy {

  public dayMappedEntries = [];
  public graphViewActivated = false;
  public loading = true;

  //MISC
  private currentEntryLoadingAction: ExtendedAction<DiaryListComponent> = null;

  //Destruction
  private destroy = new Subject();

  constructor(private entryService: EntryService, private store: Store<{ diary: Diary }>) { }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  ngOnInit(): void {
    let subscription = this.store.pipe(takeUntil(this.destroy), select('diary')).pipe(map(x => {
      return this.entryService.mapEntriesToDays(x.loadedEntries);
    })
    ).subscribe(
      dayMappedntries => {
        this.dayMappedEntries = dayMappedntries.map(z => {
          let sortedEntries = z.entries.sort((a, b) => +b.timeStamp - +a.timeStamp);
          return { day: z.day, entries: z.entries }
        });
      }
    );

    ActionUtil.dispatch(this.store, DiaryListActions.OPENEND, new ExtendedAction(this), this.destroy).then(() => this.loading = false);

  }
}
