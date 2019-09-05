
import { createReducer, on, State, Action } from '@ngrx/store';
import { User } from '../user/user';
import { UserEffectsActions } from 'src/shared/effects/user-effects.actions';


export const initialState: User = new User();

export function userReducerExport(state: State<any> | undefined, action: Action) {
    return userReducer(state, action);
}

export const userReducer = createReducer(initialState as any, on(UserEffectsActions.MY_DIARIES_AND_GRANTS_LOADED, (state, action) =>
    ({ ...state, myDiaries: action.myDiaries, grants: action.gants }))
);
