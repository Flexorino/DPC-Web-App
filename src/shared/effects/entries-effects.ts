import { DiaryListActions } from './../../app/diary/components/diary-list/diary-list.actions';
import { Store, ActionCreator, select } from '@ngrx/store';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, tap, flatMap, takeUntil, delay } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import { entryApiLoaded, entryApiEntryAdded } from '../services/entry.service.actions';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class DiaryEffects {
    loadEntries$ = createEffect(() => this.actions$.pipe(
        ofType(DiaryListActions.OPENEND, DiaryListActions.CLOSED),
        mergeMap(this.loadEntries())
    )
    );
    addEntry$ = createEffect(() => this.actions$.pipe(
        ofType('[AddEntry Component] confirm'),
        mergeMap(() => this.entryService.addEntry('test', new Entry(123, []))
            .pipe(
                map(
                    entries => {
                        return (entryApiEntryAdded());
                    }),
                catchError((err) => EMPTY),
            ))
    )
        , { dispatch: true });

    constructor(
        private actions$: Actions,
        private entryService: EntryService,
        private store: Store<any>
    ) { }

    private loadEntries(): () => Observable<TypedAction<any>> {
        return () => this.entryService.getEntries('test')
            .pipe(
                delay(3000),
                map(
                    entries => {
                        return (entryApiLoaded({ entries: entries }));
                    }),
                catchError((err) => EMPTY),
                takeUntil(this.actions$.pipe(ofType(DiaryListActions.CLOSED)))
            );
    }
}