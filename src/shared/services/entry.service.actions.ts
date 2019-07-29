import { props, createAction } from '@ngrx/store';
import { Entry } from '../model/diary/entry/entry';

export const entryApiLoaded = createAction('[Scoreboard Page] Home Score',props<{ entries: Array<Entry> }>());
export const entryApiEntryAdded = createAction('[EntryService API] addedEntry');