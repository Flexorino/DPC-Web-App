import { Diary } from 'src/shared/model/diary/diary';
import { createAction, props } from '@ngrx/store';

export class DiaryServiceActions {
    static DIARY_INFOMATION_LOADED = createAction('[DiaryService DAO] DiaryInformationLoaded', props<{ diary: Diary }>());
}