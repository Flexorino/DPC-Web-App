import { AddEntryActions } from './../../app/diary/components/add-entry/add-entry.actions';
import { DiaryListActions } from './../../app/diary/components/diary-list/diary-list.actions';
import { Store } from '@ngrx/store';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, takeUntil, delay, filter, tap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import { entryApiLoaded, entryApiEntryAdded } from '../services/entry.service.actions';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class DiaryEffects {
    loadEntries$ = createEffect(() => this.actions$.pipe(
        ofType(DiaryListActions.OPENEND, DiaryListActions.CLOSED),
        mergeMap(this.loadEntries(DiaryListActions.OPENEND, DiaryListActions.CLOSED))
    )
    );
    addEntry$ = createEffect(() => this.actions$.pipe(
        ofType(AddEntryActions.CONFIRM),
        mergeMap(() => this.entryService.addEntry('test', new Entry(123, []))
            .pipe(
                map(
                    () => {
                        return (entryApiEntryAdded());
                    }),
                catchError(() => EMPTY),
            ))
    )
        , { dispatch: true });

    constructor(
        private actions$: Actions,
        private entryService: EntryService) { }

    private loadEntries(req, cancel): () => Observable<TypedAction<any>> {
        return () => this.entryService.getEntries('test')
            .pipe(
                delay(3000),
                map(
                    entries => {
                        return (entryApiLoaded({ entries: entries }));
                    }),
                catchError(() => EMPTY),
                takeUntil(this.actions$.pipe(tap(x => console.log(x.type)),ofType(DiaryListActions.CLOSED)))
            );
    }
}