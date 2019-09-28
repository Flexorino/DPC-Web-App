import { CompletableActionWithData } from './../../../../shared/actions/CompletableActionWitHData';
import { createAction, props } from '@ngrx/store';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { CollViewComponent } from './coll-view.component';

export class CollViewActions {
    static OPENED = createAction('[CollView Component] opened', props<CompletableAction<CollViewComponent, void>>());
    static DIARY_ADDED = createAction('[DIARY_ADDED Component] opened', props<CompletableActionWithData<CollViewComponent, void, { name: string }>>());
}