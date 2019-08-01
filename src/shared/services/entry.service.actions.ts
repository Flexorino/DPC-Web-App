import { props, createAction } from '@ngrx/store';
import { Entry } from '../model/diary/entry/entry';

export class EntryServiceActions {
    static ENTRIES_LOADED = createAction('[Scoreboard Page] Home Score', props<{ entries: Array<Entry> }>());
    static ENTRY_ADDED = createAction('[EntryService API] addedEntry', props<{ entry: Entry }>());
}
