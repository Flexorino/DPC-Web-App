import { UserService } from './../services/user.service';
import { UserManagementService } from './../../web-api/api/userManagement.service';
import { GrantManagementService } from './../../web-api/api/grantManagement.service';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { CollViewActions } from './../../app/configs/component/coll-view/coll-view.actions';
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { CompletableAction } from '../actions/CompletableAction';
import { UserServiceActions } from '../services/user.service.actions';

@Injectable()
export class UserEffects {

    addEntry$ = createEffect(() => this.actions$.pipe(
        ofType(CollViewActions.OPENED),
        
        tap(x => console.log("kek")),
        mergeMap(x =>
                 this.userService.getMyDiaries().pipe(map(y => UserServiceActions.MY_DIARIES_LOADED({ references: y })),
                 catchError(x => {console.log(x); return EMPTY;})
                 
                 )
        )
    )
        , { dispatch: true });

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}