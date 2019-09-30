import { AddEntryActionsProps } from './../sharedActionsProps.ts/add-entry-props';

import { state } from '@angular/animations';
import { createAction, props } from '@ngrx/store';
import { ExtendedAction } from 'src/shared/actions/ExtendedAction';
import { AddIngestionComponent } from './add-ingestion.component';

export class AddIngestionActions {
    static ABORT = createAction('[AddIngestion Component] abort', props<ExtendedAction<AddIngestionComponent, void>>());
    static OPENED = createAction('[AddIngestion Component] opened', props<ExtendedAction<AddIngestionComponent, void>>());
    static CONFIRM = createAction('[AddIngestion Component] confirmed', props<AddEntryActionsProps<AddIngestionComponent>>());
}
