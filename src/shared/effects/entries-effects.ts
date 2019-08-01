import { AddEntryActions } from './../../app/diary/components/add-entry/add-entry.actions';
import { DiaryListActions } from './../../app/diary/components/diary-list/diary-list.actions';
import { Store } from '@ngrx/store';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, takeUntil, delay, filter, tap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import { TypedAction } from '@ngrx/store/src/models';
import { EntryServiceActions } from '../services/entry.service.actions';

// Effects for Loading Entries over Network

@Injectable()
export class DiaryEffects {
    loadEntries$ = createEffect(() => this.actions$.pipe(
        ofType(DiaryListActions.OPENEND, DiaryListActions.CLOSED),
        mergeMap(action => { 
            return this.loadEntries(action, DiaryListActions.CLOSED);
        })
    )
    );
    addEntry$ = createEffect(() => this.actions$.pipe(
        ofType(AddEntryActions.CONFIRM),
        mergeMap(() => this.entryService.addEntry('test', new Entry(123, []))
            .pipe(
                map(
                    (entry: Entry) => {
                        return (EntryServiceActions.ENTRY_ADDED({ entry: entry }));
                    }),
                catchError((e) => EMPTY),
            ))
    )
        , { dispatch: true });

    constructor(
        private actions$: Actions,
        private entryService: EntryService) { }

    private loadEntries(req, cancel): Observable<TypedAction<any>> {
        return this.entryService.getEntries('test')
            .pipe(
                delay(3000),
                map(
                    entries => {
                        req.resolve();
                        return (EntryServiceActions.ENTRIES_LOADED({ entries: entries }));
                    }),
                catchError(() => EMPTY),
                takeUntil(this.actions$.pipe(tap(x => console.log(x.type)), ofType(DiaryListActions.CLOSED)))
            );
    }
}