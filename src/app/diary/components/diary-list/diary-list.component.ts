import { DiaryViews } from './../../services/DiaryViews';
import { CancelableAction } from './../../../../shared/actions/CancelableAction';
import { CompletableAction } from './../../../../shared/actions/CompletableAction';
import { BasicActionProps } from './../../../../shared/actions/basic-action-props';
import { Store, select } from '@ngrx/store';
import { EntryService } from './../../../../shared/services/entry.service';
import { EintrgeService } from './../../../../web-api/api/eintrge.service';
import { EntryAttributeTypes } from './../../../../shared/model/diary/entry/entry-attribute-types';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaseEntryAttribute } from 'src/shared/model/diary/entry/base-entry-attribute';
import { map, tap, timestamp } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DiaryListActions } from './diary-list.actions';
import { Diary } from 'src/shared/model/diary/diary';
import { CurrentDiaryViewSerivce } from '../../services/CurrentDiaryView.service';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnInit, OnDestroy {

  public dayMappedEntries = [];
  public graphViewActivated = false;
  private entrySubscription: Subscription;

  private currentAction: CancelableAction<DiaryListComponent, void> = null;

  ngOnDestroy(): void {
    this.currentAction.cancel(null);
    this.store.dispatch(DiaryListActions.CLOSED(new BasicActionProps(this)));
    this.entrySubscription.unsubscribe();
  }
  ngOnInit(): void {
    let x = this.store.pipe(select('diary')).pipe(tap(x => console.log(x)), map(x => {
      return this.entryService.mapEntriesToDays(x.loadedEntries);
    }, tap(x => console.log(x)))).subscribe(
      x => {
        this.dayMappedEntries = x.map(z => {
          let sortedEntries = z.entries.sort((a,b)=> +a.timeStamp - +b.timeStamp);
          return { day: z.day, entries: z.entries }
        });
      }
    );
    let promiseResolve;
    let promiseReject;
    let promise = new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    let action: CancelableAction<DiaryListComponent, void> = new CancelableAction(this);
    this.store.dispatch(DiaryListActions.OPENEND(action));
    promise.then(() => console.log("fertig"));
    this.currentAction = action;
    this.entrySubscription = x;
  }

  constructor(private entryService: EntryService, private store: Store<{ diary: Diary }>) {
  }



}
