import { AddEntryActions } from '../../../app/diary/components/add-entry-components/add-entry/add-entry.actions';
import { Entry } from '../diary/entry/entry';
import { createReducer, on, State, Action } from '@ngrx/store';
import { state } from '@angular/animations';
import { EntryServiceActions } from 'src/shared/services/entry.service.actions';
import { Diary } from '../diary/diary';
import { DiaryService } from 'src/shared/services/diary.service';
import { DiaryServiceActions } from 'src/shared/services/diary.service.actions';
import { GeneralEffectActions } from 'src/shared/effects/general-effect-actions';
import { Patcherino } from 'src/shared/services/patcherino/patcherino';
import * as _ from "lodash";

export const initialState: Diary = new Diary([]);

export  function diaryReducerExport(state: State<any> | undefined, action: Action) {
  return diaryReducer(state, action);
}

export const diaryReducer = createReducer(initialState, on(EntryServiceActions.ENTRIES_LOADED, (_, action) => {
  return new Diary(action.entries);
}), on(EntryServiceActions.ENTRY_ADDED, (state: Diary, action) =>
  ({ ...state, loadedEntries: state.loadedEntries.concat([action.entry]) })),
  on(DiaryServiceActions.DIARY_INFOMATION_LOADED, (state: Diary, action) => ({ ...state, name: action.diary.name })),
  on(GeneralEffectActions.PatchReady, (state: Diary, action) => {
    let newState: any = _.cloneDeep(state);
    Patcherino.applyOn(newState, action.patch);
    return newState;
  })
);
