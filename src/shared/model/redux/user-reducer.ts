
import { createReducer, on, State, Action } from '@ngrx/store';
import { User } from '../user/user';
import { UserEffectsActions } from 'src/shared/effects/user-effects.actions';
import { GeneralEffectActions } from 'src/shared/effects/general-effect-actions';
import * as _ from 'lodash';
import { Patcherino } from 'src/shared/services/patcherino/patcherino';


export const initialState: User = new User();

export function userReducerExport(state: State<any> | undefined, action: Action) {
    return userReducer(state, action);
}

export const userReducer = createReducer(initialState as any, on(UserEffectsActions.MY_DIARIES_AND_GRANTS_LOADED, (state, action) =>
    ({ ...state, myDiaries: action.myDiaries, grants: action.gants })),
    on(GeneralEffectActions.UserPatchReady, (state: User, action) => {
        let newState: any = _.cloneDeep(state);
        Patcherino.applyOn(newState, action.patch);
        return newState;
    })
);
