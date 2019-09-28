import { CollViewComponent } from './../../app/configs/component/coll-view/coll-view.component';
import { CollViewActions } from './../../app/configs/component/coll-view/coll-view.actions';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EffectsUtil } from './effects-util';
import { UserService } from '../services/user.service';
import { CompletableAction } from '../actions/CompletableAction';
import { Observable, timer } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { GeneralEffectActions } from './general-effect-actions';
import { Patch } from '../services/patcherino/patch';
import { Action } from '@ngrx/store';
import { DiaryReference } from '../model/user/diary-reference';

@Injectable()
export class CollViewEffects {

    private onOpened$;
    constructor(
        private actions$: Actions, private util: EffectsUtil, private userService: UserService
    ) {
        this.onOpened$ = util.when(CollViewActions.OPENED).do(x => this.handleOpened(x));
    }

    private handleOpened(props: CompletableAction<CollViewComponent, void>): Observable<Action> {
        return timer(1000,1000).pipe(take(1),tap(x => props.resolve(null)), map(x => GeneralEffectActions.UserPatchReady({ patch: new Patch([], [{myDiaries: [new DiaryReference("kek","mein Tagebuch1")]}]) })));
    }
} 