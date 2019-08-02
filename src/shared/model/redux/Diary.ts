import { AddEntryActions } from './../../../app/diary/components/add-entry/add-entry.actions';
import { Entry } from '../diary/entry/entry';
import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { Action } from 'rxjs/internal/scheduler/Action';
import { EntryServiceActions } from 'src/shared/services/entry.service.actions';
import { Diary } from '../diary/diary';

export const initialState: Diary = new Diary([]);

export const diaryReducer = createReducer(initialState, on(EntryServiceActions.ENTRIES_LOADED, (_, action) => {
  return new Diary(action.entries);
}), on(EntryServiceActions.ENTRY_ADDED, (state: Diary, action) => (new Diary(state.loadedEntries.concat([action.entry])))));
