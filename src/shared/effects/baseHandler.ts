import { Patch } from './../services/patcherino/patch';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ExtendedAction } from '../actions/ExtendedAction';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { DiariesService } from 'src/web-api';
import { DiaryNavigationService } from '../services/diary.navigation.service';
import { GeneralEffectActions } from './general-effect-actions';


@Injectable({ providedIn: "root" })
export class BaseHandlers {

    constructor(private diaryService: DiariesService, private diaryNav: DiaryNavigationService) {

    }

    public loadBaseDiaryData(props: ExtendedAction<any, void>): Observable<Action> {
        return this.diaryService.getDiary2(this.diaryNav.currentDiaryId$.getValue()).pipe(
            map(x => GeneralEffectActions.PatchReady({ patch: new Patch([], [{ name: x.preferences.name }]) })))
    }
}