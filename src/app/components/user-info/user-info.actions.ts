import { UserInfoComponent } from './user-info.component';
import { createAction, props } from '@ngrx/store';
import { ExtendedAction } from 'src/shared/actions/ExtendedAction';

export class UserInfoActions {
    static OPENED = createAction('[UserInfoActions Component] opened', props<ExtendedAction<UserInfoComponent, void>>());
}