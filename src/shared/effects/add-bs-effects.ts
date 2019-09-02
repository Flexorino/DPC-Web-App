import { AddBSMeasureComponent } from './../../app/diary/components/add-entry-components/add-bsmeasure/add-bsmeasure.component';
import { Injectable } from "@angular/core";
import { Actions } from '@ngrx/effects';
import { EffectsUtil } from './effects-util';
import { AddBSMeasreActions } from 'src/app/diary/components/add-entry-components/add-bsmeasure/add-bsmeasure.actions';
import { EMPTY, Observable, of } from 'rxjs';
import { finalize, delay, tap } from 'rxjs/operators';
import { DiaryContext } from '../model/diary/context/diary-context';
import { DiaryCorrectionFactors } from '../model/diary/context/diary-correction-factors';
import { DiaryContextKEFactors } from '../model/diary/context/diary-context-KE-factors';
import { DiaryContextFrameValues } from '../model/diary/context/diary-context-frame-values';
import { InsulinEffect } from '../model/diary/insulin';
import { Absorption, Food } from '../model/diary/food';
import { CompletableAction } from '../actions/CompletableAction';
import { GeneralEffectActions } from './general-effect-actions';
import { Patch } from '../services/patcherino/patch';
import { Action } from '@ngrx/store';

@Injectable()
export class AddBSEffects {
    openedListener$;
    confirmListener$;

    private handleOpened(props: CompletableAction<AddBSMeasureComponent, void>): Observable<Action> {
        let f = new Food("asd");
        f.absorption = Absorption.FAST;
        f.name = "Sauerkraut-Saft";
        let food: any = [f, { id: "asdasds", name: "Pizza", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad", _type: Food },
            { _type: Food, id: "asdasds2", name: "Pasta", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds3", name: "Nüsse", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds4", name: "Pasta mit soße", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds5", name: "Zucker", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds6", name: "Schnitzel", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds7", name: "Cola", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds8", name: "Apfel-Schorle", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds9", name: "Brot", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds10", name: "Pumpernickel", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" },
            { _type: Food, id: "asdasds11", name: "Frühstücks-Brot", absorption: Absorption.MEDIUM, carbsFactor: 0.5, description: "asdad" }
        ];
        let insulins: any = [{ id: "asdasddds", name: "Insulin 1", insulinEffect: InsulinEffect.MEDIUM, description: "asdad" },
        { id: "asdasddds2", name: "Insulin 2", insulinEffect: InsulinEffect.FAST, description: "asdad" }];

        let context: DiaryContext = new DiaryContext("contextID");
        let correctionFactors: DiaryCorrectionFactors = new DiaryCorrectionFactors("correctionFactorsId");
        correctionFactors.dialyCorrectionFactors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        let keFactors: DiaryContextKEFactors = new DiaryContextKEFactors("adsasdasd");
        keFactors.dialyKeFactors = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2];
        let frameValues: DiaryContextFrameValues = new DiaryContextFrameValues("frame values");
        frameValues.dailyBSGoalValues = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
        frameValues.higherBSLimit = 3;
        frameValues.lowerBSLimit = 1;
        frameValues.hypoglycemiaLimit = 0.5;
        frameValues.hyperglycemiaLimit = 3;
        context.validFrom = new Date(1553334757 * 1000);
        context.correctionFactors = correctionFactors;
        context.keFactor = keFactors;
        context.frameValue = frameValues;

        return of(GeneralEffectActions.PatchReady({
            patch: new Patch(insulins.concat(food).concat([context, context.correctionFactors, context.frameValue, context.keFactor]), [{
                food: food, insulins: insulins, contexts: [context]
            }])
        })).pipe(delay(1000), tap(x => props.resolve(null)));

    }

    constructor(
        private actions$: Actions, private util: EffectsUtil
    ) {
        this.openedListener$ = util.when(AddBSMeasreActions.OPENED).do(this.handleOpened);
        this.confirmListener$ = util.when(AddBSMeasreActions.CONFIRM).do(x => {
            return EMPTY.pipe().pipe(delay(2000), finalize(() => x.resolve(null)));
        });
    }
}