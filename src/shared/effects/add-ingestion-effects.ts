import { FullDiary } from './../../web-api/model/fullDiary';
import { DiariesService } from './../../web-api/api/diaries.service';
import { DiaryNavigationService } from './../services/diary.navigation.service';
import { AddEntryActionsProps } from './../../app/diary/components/add-entry-components/sharedActionsProps.ts/add-entry-props';
import { DiaryContext } from './../model/diary/context/diary-context';
import { AddIngestionComponent } from './../../app/diary/components/add-entry-components/add-ingestion/add-ingestion.component';

import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { Food } from './../model/diary/food';
import { Insulin, InsulinEffect } from './../model/diary/insulin';

import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, delay, tap, finalize, flatMap, withLatestFrom, map } from 'rxjs/operators';
import { DiaryListActions } from 'src/app/diary/components/diary-list/diary-list.actions';
import { EMPTY, Observable, of, empty, combineLatest } from 'rxjs';
import { AddIngestionActions } from 'src/app/diary/components/add-entry-components/add-ingestion/add-ingestion.actions';
import { GeneralEffectActions } from './general-effect-actions';
import { Patch } from '../services/patcherino/patch';
import { Absorption } from '../model/diary/food';
import { Action } from '@ngrx/store';
import { EffectsUtil } from './effects-util';
import { when } from 'q';
import { DiaryCorrectionFactors } from '../model/diary/context/diary-correction-factors';
import { DiaryContextKEFactors } from '../model/diary/context/diary-context-KE-factors';
import { DiaryContextFrameValues } from '../model/diary/context/diary-context-frame-values';
import { EntryService } from '../services/entry.service';

@Injectable()
export class AddIngestionEffects {
    openedListener$;
    confirmListener$;

    private handleSubmit(props: AddEntryActionsProps<AddIngestionActions>): Observable<Action> {
        console.log("POOST");
        return this.entryService.addEntry(this.diaryNav.currentDiaryId$.getValue(), props.entryToAdd).pipe(tap(x => props.resolve(null)), flatMap(x => EMPTY));
    }

    private handleOpened(props: CompletableAction<AddIngestionComponent, void>): Observable<Action> {

        return combineLatest(this.diaryService.getDiary2(this.diaryNav.currentDiaryId$.getValue())).pipe(map(x => {
            let fullDiary: FullDiary = x[0];
            let f = new Food("asd");
            f.absorption = Absorption.FAST;
            f.name = "Sauerkraut-Saft";

            let foody = [];
            fullDiary.food.forEach(x => {
                let oneFood = new Food(x.id);
                oneFood.description = x.comment;
                if (x.resorption) {
                    oneFood.absorption = x.resorption == "fast" ? Absorption.FAST : x.resorption == "medium" ? Absorption.MEDIUM : Absorption.SLOW;
                }
                oneFood.carbsFactor = x.carbsFactor;
                oneFood.name = x.name;
            })
            

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
            props.resolve(null);
            return GeneralEffectActions.PatchReady({
                patch: new Patch(insulins.concat(food).concat([context, context.correctionFactors, context.frameValue, context.keFactor]), [{
                    food: food, insulins: insulins, contexts: [context]
                }])
            });
        }));

    }

    constructor(
        private actions$: Actions, private util: EffectsUtil, private entryService: EntryService, private diaryNav: DiaryNavigationService, private diaryService: DiariesService
    ) {
        this.openedListener$ = util.when(AddIngestionActions.OPENED).do(x => this.handleOpened(x));
        this.confirmListener$ = util.when(AddIngestionActions.CONFIRM).do(x => this.handleSubmit(x));
    }
}