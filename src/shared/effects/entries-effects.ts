import { DiaryNavActions } from './../../app/diary/diary-nav/diary-nav.actions';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AddEntryActions } from './../../app/diary/components/add-entry/add-entry.actions';
import { DiaryListActions } from './../../app/diary/components/diary-list/diary-list.actions';
import { Store } from '@ngrx/store';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, Observable, from, pipe, of, empty } from 'rxjs';
import { map, mergeMap, catchError, takeUntil, delay, filter, tap, mapTo, flatMap } from 'rxjs/operators';
import { EntryService } from '../services/entry.service';
import { TypedAction } from '@ngrx/store/src/models';
import { EntryServiceActions } from '../services/entry.service.actions';
import { DiaryService } from '../services/diary.service';
import { DiaryNavigationService } from '../services/diary.navigation.service';
import { DiaryServiceActions } from '../services/diary.service.actions';

// Effects for Loading Entries over Network

@Injectable()
export class DiaryEffects {
    loadEntries$ = createEffect(() => this.actions$.pipe(
        ofType(DiaryListActions.OPENEND),
        mergeMap(action => {
            return this.loadEntries(action, DiaryListActions.CLOSED);
        })
    )
    );
    addEntry$ = createEffect(() => this.actions$.pipe(
        ofType(AddEntryActions.CONFIRM),
        mergeMap((action) => this.entryService.addEntry(this.currentDiaryService.currentDiaryId$.getValue(), action.entry)
            .pipe(
                map(
                    (entry: Entry) => {
                        action.resolve();
                        return (EntryServiceActions.ENTRY_ADDED({ entry: entry }));
                    }),
                catchError((e) => EMPTY),
            ))
    )
        , { dispatch: true });

    // Sorgt dafür, dass alle notwendigen Daten wie z.B. Medikamente geladen werden
    addEntryViewLoadedEffect = createEffect(() => this.actions$.pipe(
        ofType(AddEntryActions.OPENED),
        mergeMap((action) => this.diaryService.getDrugs(this.currentDiaryService.currentDiaryId$.getValue()).pipe(
            tap(answer => action.resolve(null)),
            flatMap(x => EMPTY),
            catchError((e) => {
                action.reject(null);
                return EMPTY;
            })
        ))
    ));

    diaryNavViewLoadedEffect$ = createEffect(() => this.actions$.pipe(
        ofType(DiaryNavActions.OPEN),
        mergeMap((action) => this.diaryService.getDiaryInformation(this.currentDiaryService.currentDiaryId$.getValue()).pipe(
            map(x => DiaryServiceActions.DIARY_INFOMATION_LOADED({ diary: x })),
            catchError(() => EMPTY)
        ))
    ));

    constructor(
        private actions$: Actions,
        private entryService: EntryService,
        private diaryService: DiaryService,
        private currentDiaryService: DiaryNavigationService
    ) { }

    private loadEntries(req, cancel): Observable<TypedAction<any>> {
        return this.entryService.getEntries(this.currentDiaryService.currentDiaryId$.getValue())
            .pipe(
                map(
                    entries => {
                        return (EntryServiceActions.ENTRIES_LOADED({ entries: entries }));
                    }),
                catchError(() => EMPTY),
                takeUntil(from(req.cancelPromise))
            );
    }
}