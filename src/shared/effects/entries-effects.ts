import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, flatMap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import { entryApiLoaded } from '../services/entry.service.actions';

@Injectable()
export class DiaryEffects {
    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType('[Dialist Component] loaded'),
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

    constructor(
        private actions$: Actions,
        private entryService: EntryService
    ) { }
}