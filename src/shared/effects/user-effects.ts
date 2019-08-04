import { UserEffectsActions } from './user-effects.actions';
import { UserService } from './../services/user.service';
import { UserManagementService } from './../../web-api/api/userManagement.service';
import { GrantManagementService } from './../../web-api/api/grantManagement.service';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { CollViewActions } from './../../app/configs/component/coll-view/coll-view.actions';
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, pipe, forkJoin } from 'rxjs';
import { CompletableAction } from '../actions/CompletableAction';
import { UserServiceActions } from '../services/user.service.actions';

@Injectable()
export class UserEffects {

    addEntry$ = createEffect(() => this.actions$.pipe(
        ofType(CollViewActions.OPENED),
        
        tap(x => console.log("kek")),
        mergeMap(x => 
            {
            return forkJoin([
                this.userService.getMyDiaries(),
                this.userService.getMyGrants()
            ]).pipe(tap(x => console.log(x)),map(x => UserEffectsActions.MY_DIARIES_AND_GRANTS_LOADED({myDiaries:x[0],gants:x[1]})));
            }
        )
    )
        , { dispatch: true });

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}