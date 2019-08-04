import { Grant } from './../model/user/grant';
import { createAction, props } from '@ngrx/store';
import { DiaryReference } from '../model/user/diary-reference';

export class UserEffectsActions {
    static MY_DIARIES_AND_GRANTS_LOADED = createAction('[UserEffects DAO] MY_DIARIES_AND_GRANTS_LOADED', props<{ myDiaries: Array<DiaryReference>, gants: Array<Grant> }>());
}