import { UserServiceActions } from './../../services/user.service.actions';
import { User } from '../user/user';
import { createReducer, on } from '@ngrx/store';

export const initialState: User = new User();

export const userReducer = createReducer(initialState, on(UserServiceActions.MY_DIARIES_LOADED, (state, action) =>
    ({ ...state, loadedEntries: action.references }))
);
