import { AddEntryBSMeasureEntryComponent } from './../../app/diary/components/add-entry-components/inputs/components/add-entry-bsmeasure-entry/add-entry-bsmeasure-entry.component';
import { AddBSMeasureComponent } from './../../app/diary/components/add-entry-components/add-bsmeasure/add-bsmeasure.component';
import { Injectable } from "@angular/core";
import { Actions } from '@ngrx/effects';
import { EffectsUtil } from './effects-util';
import { AddBSMeasreActions } from 'src/app/diary/components/add-entry-components/add-bsmeasure/add-bsmeasure.actions';
import { EMPTY, Observable, of } from 'rxjs';
import { finalize, delay, tap, flatMap } from 'rxjs/operators';
import { DiaryContext } from '../model/diary/context/diary-context';
import { DiaryCorrectionFactors } from '../model/diary/context/diary-correction-factors';
import { DiaryContextKEFactors } from '../model/diary/context/diary-context-KE-factors';
import { DiaryContextFrameValues } from '../model/diary/context/diary-context-frame-values';
import { InsulinEffect } from '../model/diary/insulin';
import { Absorption, Food } from '../model/diary/food';
import { ExtendedAction } from '../actions/ExtendedAction';
import { GeneralEffectActions } from './general-effect-actions';
import { Patch } from '../services/patcherino/patch';
import { Action } from '@ngrx/store';
import { AddEntryActionsProps } from 'src/app/diary/components/add-entry-components/sharedActionsProps.ts/add-entry-props';
import { EntryService } from '../services/entry.service';
import { DiaryNavigationService } from '../services/diary.navigation.service';

@Injectable()
export class AddBSEffects {
    openedListener$;
    confirmListener$;

    private handleOpened(props: ExtendedAction<AddBSMeasureComponent, void>): Observable<Action> {
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
        correctionFactors.dialyCorrectionFactors = [2, 2, 2, 2, 2.2, 2.2, 2.2, 2.2, 2, 2, 2, 2, 2.2, 2.2, 2.2, 1.7, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4];
        let keFactors: DiaryContextKEFactors = new DiaryContextKEFactors("adsasdasd");
        keFactors.dialyKeFactors = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2];
        let frameValues: DiaryContextFrameValues = new DiaryContextFrameValues("frame values");
        frameValues.dailyBSGoalValues = [5.6, 5.3, 5.2, 5, 5, 6, 5.7, 6, 6, 5, 5, 6, 5.3, 5.3, 5.3, 4, 5, 6, 5.3, 5.4, 5.3, 4, 5, 6];
        frameValues.higherBSLimit = 7.2;
        frameValues.lowerBSLimit = 4.4;
        frameValues.hypoglycemiaLimit = 3.3;
        frameValues.hyperglycemiaLimit = 10.5;
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
        private actions$: Actions, private util: EffectsUtil, private entryService: EntryService, private diaryNav: DiaryNavigationService
    ) {
        this.openedListener$ = util.when(AddBSMeasreActions.OPENED).do(this.handleOpened);
        this.confirmListener$ = util.when(AddBSMeasreActions.CONFIRM).do(x =>
            this.handleSubmit(x)
        );
    }

    private handleSubmit(props: AddEntryActionsProps<AddBSMeasureComponent>): Observable<Action> {
        console.log("POOST");
        return this.entryService.addEntry(this.diaryNav.currentDiaryId$.getValue(), props.entryToAdd).pipe(tap(x => props.resolve(null)), flatMap(x => EMPTY));
    }
}