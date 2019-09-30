import { DiariesService } from './../../web-api/api/diaries.service';
import { CompletableActionWithData } from './../actions/CompletableActionWitHData';
import { UserManagementService } from './../../web-api/api/userManagement.service';
import { CollViewComponent } from './../../app/configs/component/coll-view/coll-view.component';
import { CollViewActions } from './../../app/configs/component/coll-view/coll-view.actions';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EffectsUtil } from './effects-util';
import { UserService } from '../services/user.service';
import { CompletableAction } from '../actions/CompletableAction';
import { Observable, timer, EMPTY } from 'rxjs';
import { tap, map, take, flatMap } from 'rxjs/operators';
import { GeneralEffectActions } from './general-effect-actions';
import { Patch } from '../services/patcherino/patch';
import { Action } from '@ngrx/store';
import { DiaryReference } from '../model/user/diary-reference';

@Injectable()
export class CollViewEffects {

    private onOpened$;
    private onAdded$;

    constructor(
        private actions$: Actions, private util: EffectsUtil, private userService: UserService, private userManService: UserManagementService, private diaryService: DiariesService
    ) {
        this.onOpened$ = util.when(CollViewActions.OPENED).do(x => this.handleOpened(x));
        this.onAdded$ = util.when(CollViewActions.DIARY_ADDED).do(x => this.handleAdded(x));
    }

    private handleAdded(props: CompletableActionWithData<CollViewComponent, void, { name: string }>): Observable<Action> {
        return this.diaryService.addDiary({ preferences: { name: props.data.name } }).pipe(flatMap(x => this.handleOpened(props)));
    }

    private handleOpened(props: CompletableAction<CollViewComponent, void>): Observable<Action> {
        return this.userManService.getUserDiaries().pipe(tap(x => props.resolve(null)), map(x => {
            let ownedDiares = x.owned.map(x => new DiaryReference(x.id, x.preferences.name));
            return GeneralEffectActions.UserPatchReady({ patch: new Patch([], [{ myDiaries: ownedDiares }]) })
        }
        ));
    }
} 