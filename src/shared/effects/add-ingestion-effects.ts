
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { DiaryListActions } from 'src/app/diary/components/diary-list/diary-list.actions';
import { EMPTY } from 'rxjs';
import { AddIngestionActions } from 'src/app/diary/components/add-entry-components/add-ingestion/add-ingestion.actions';

@Injectable()
export class AddIngestionEffects {
    loadEntries$ = createEffect(() => this.actions$.pipe(
        ofType(AddIngestionActions.OPENED),
        mergeMap(action => {
            setTimeout(() => action.resolve(null), 3000);
            return EMPTY;
        }
        )
    )
    );

    constructor(
        private actions$: Actions
    ) { }
}