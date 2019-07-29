import { Entry } from '../diary/entry/entry';
import { createReducer, on } from '@ngrx/store';
import { entryApiLoaded } from 'src/shared/services/entry.service.actions';
import { state } from '@angular/animations';
import { Action } from 'rxjs/internal/scheduler/Action';
import { addEntryConfrim } from 'src/app/diary/components/add-entry/add-entry.actions';

export class Diary {
    constructor(public loadedEntries: Array<Entry> ){

    }
}

export const initialState: Diary = new Diary( []);

export const diaryReducer = createReducer(initialState, on(entryApiLoaded, (state, action) =>
    {
  return new Diary(action.entries);
}), on(addEntryConfrim, (state)=>(new Diary([])))); 