import { createAction, props } from '@ngrx/store';
import { ExtendedAction } from 'src/shared/actions/ExtendedAction';
import { CollViewComponent } from './coll-view.component';

export class CollViewActions {
    static OPENED = createAction('[CollView Component] opened', props<ExtendedAction<CollViewComponent, void>>());
    static DIARY_ADDED = createAction('[DIARY_ADDED Component] opened', props<ExtendedAction<CollViewComponent, void, { name: string }>>());
}