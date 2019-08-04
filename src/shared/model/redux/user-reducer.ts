import { UserEffectsActions } from './../../effects/user-effects.actions';
import { UserServiceActions } from './../../services/user.service.actions';
import { User } from '../user/user';
import { createReducer, on } from '@ngrx/store';

export const initialState: User = new User();

export const userReducer = createReducer(initialState, on(UserEffectsActions.MY_DIARIES_AND_GRANTS_LOADED, (state, action) =>
    ({ ...state, myDiaries: action.myDiaries, grants: action.gants }))
);
