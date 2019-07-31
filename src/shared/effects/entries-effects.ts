import { Store } from '@ngrx/store';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, flatMap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import { entryApiLoaded, entryApiEntryAdded } from '../services/entry.service.actions';

@Injectable()
export class DiaryEffects {
    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType('[Dialist Component] loaded', '[AddEntry Component] confirm'),
        mergeMap(() => this.entryService.getEntries('test')
            .pipe(
                map(
                    entries => {
                        return (entryApiLoaded({ entries: entries }));
                    }),
                catchError((err) => EMPTY)
            ))
    )
    );
    addEmtry$ = createEffect(() => this.actions$.pipe(
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
}