import { createAction, props } from '@ngrx/store';
import { DiaryReference } from '../model/user/diary-reference';

export class UserServiceActions {
    static MY_DIARIES_LOADED = createAction('[UserService DAO] UserOwnedDiariesLoaded', props<{ references: Array<DiaryReference> }>());
}