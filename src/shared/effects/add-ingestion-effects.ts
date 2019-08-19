import { Food } from './../model/diary/food';
import { Insulin, InsulinEffect } from './../model/diary/insulin';

import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, delay, tap } from 'rxjs/operators';
import { DiaryListActions } from 'src/app/diary/components/diary-list/diary-list.actions';
import { EMPTY, Observable, of } from 'rxjs';
import { AddIngestionActions } from 'src/app/diary/components/add-entry-components/add-ingestion/add-ingestion.actions';
import { GeneralEffectActions } from './general-effect-actions';
import { Patch } from '../services/patcherino/patch';
import { Absorption } from '../model/diary/food';

@Injectable()
export class AddIngestionEffects {
    loadEntries$ = createEffect(() => this.actions$.pipe(
        ofType(AddIngestionActions.OPENED),
        mergeMap(action => {
            let f = new Food("asd");
            f.absorption = Absorption.FAST;
            let food: any = [f, { id: "asdasds", name: "Pizza", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad", _type: Food },
                { id: "asdasds2", name: "Pasta", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" }];
            let insulins: any = [{ id: "asdasddds", name: "Insulin 1", insulinEffect: InsulinEffect.MEDIUM, description: "asdad" },
            { id: "asdasddds2", name: "Insulin 2", insulinEffect: InsulinEffect.FAST, description: "asdad" }];
            return of(GeneralEffectActions.PatchReady({
                patch: new Patch(insulins.concat(food), [{
                    food: food, insulins: insulins
                }])
            })).pipe(delay(1000), tap(x => action.resolve(null)));
        }
        )
    )
    );

    constructor(
        private actions$: Actions
    ) { }
}