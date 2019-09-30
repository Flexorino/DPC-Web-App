import { Patch } from './../services/patcherino/patch';
import { UserEffectsActions } from './user-effects.actions';
import { UserService, UserInfo } from './../services/user.service';
import { UserManagementService } from './../../web-api/api/userManagement.service';
import { GrantManagementService } from './../../web-api/api/grantManagement.service';
import { mergeMap, map, tap, catchError, take, flatMap } from 'rxjs/operators';
import { CollViewActions } from './../../app/configs/component/coll-view/coll-view.actions';
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, pipe, forkJoin, Observable, timer } from 'rxjs';
import { ExtendedAction } from '../actions/ExtendedAction';
import { UserServiceActions } from '../services/user.service.actions';
import { EffectsUtil } from './effects-util';
import { UserInfoActions } from 'src/app/components/user-info/user-info.actions';
import { Action } from '@ngrx/store';
import { GeneralEffectActions } from './general-effect-actions';

@Injectable()
export class UserEffects {

    private loadProfile$;
    constructor(
        private actions$: Actions, private util: EffectsUtil, private userService: UserService
    ) {
        this.loadProfile$ = util.when(UserInfoActions.OPENED).do(x => this.handleOpened(x));
    }

    private handleOpened(props: ExtendedAction<UserInfoActions, void>): Observable<Action> {
        return this.userService.getSelfInformation().pipe(tap(x => props.resolve(null)), map(x => GeneralEffectActions.UserPatchReady({ patch: new Patch([], [{name: x.name}]) })));
    }
}