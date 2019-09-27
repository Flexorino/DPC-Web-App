import { UserInfoComponent } from './user-info.component';
import { createAction, props } from '@ngrx/store';
import { CompletableAction } from 'src/shared/actions/CompletableAction';

export class UserInfoActions {
    static OPENED = createAction('[UserInfoActions Component] opened', props<CompletableAction<UserInfoComponent, void>>());
}