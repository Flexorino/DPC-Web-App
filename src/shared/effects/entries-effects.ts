import { DiaryNavActions } from './../../app/diary/diary-nav/diary-nav.actions';
import { DiaryListActions } from './../../app/diary/components/diary-list/diary-list.actions';
import { Store, on } from '@ngrx/store';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, Observable, from, pipe, of, empty } from 'rxjs';
import { map, mergeMap, catchError, takeUntil, delay, filter, tap, mapTo, flatMap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import { TypedAction, Action } from '@ngrx/store/src/models';
import { EntryServiceActions } from '../services/entry.service.actions';
import { DiaryService } from '../services/diary.service';
import { DiaryNavigationService } from '../services/diary.navigation.service';
import { DiaryServiceActions } from '../services/diary.service.actions';
import { EffectsUtil } from './effects-util';
import { ExtendedAction } from '../actions/ExtendedAction';
import { DiaryListComponent } from 'src/app/diary/components/diary-list/diary-list.component';

// Effects for Loading Entries over Network

@Injectable()
export class DiaryEffects {

    onOpended$;


    diaryNavViewLoadedEffect$ = createEffect(() => this.actions$.pipe(
        ofType(DiaryNavActions.OPEN),
        mergeMap((action) => this.diaryService.getDiaryInformation(this.currentDiaryService.currentDiaryId$.getValue()).pipe(
            map(x => {
                return DiaryServiceActions.DIARY_INFOMATION_LOADED({ diary: x });
            }),
            catchError(() => EMPTY)
        ))
    ));

    constructor(
        private actions$: Actions,
        private entryService: EntryService,
        private diaryService: DiaryService,
        private currentDiaryService: DiaryNavigationService,
        private effectsUtil: EffectsUtil
    ) {
        this.onOpended$ = effectsUtil.when(DiaryListActions.OPENEND).do(x => this.handleOpened(x));
    }

    private handleOpened(props: ExtendedAction<DiaryListComponent, void>): Observable<Action> {
        return this.entryService.getEntries(this.currentDiaryService.currentDiaryId$.getValue()).pipe(
            map(entries => {
                return (EntryServiceActions.ENTRIES_LOADED({ entries: entries }));
            }),
            takeUntil(from(props.cancelPromise)),
            tap(x => {
                console.log("resolve");
                props.resolve(null);
            }),
            catchError((err) => {
                console.log("reject");
                props.reject(err);
                return EMPTY;
            }
            )
        );
    }

}