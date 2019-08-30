import { AddBSMeasureComponent } from './add-bsmeasure.component';
import { createAction, props } from '@ngrx/store';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { AddEntryActionsProps } from '../sharedActionsProps.ts/add-entry-props';

export class AddBSMeasreActions {
    static ABORT = createAction('[AddBSMeasure Component] abort', props<CompletableAction<AddBSMeasureComponent, void>>());
    static OPENED = createAction('[AddBSMeasure Component] opened', props<CompletableAction<AddBSMeasureComponent, void>>());
    static CONFIRM = createAction('[AddBSMeasure Component] confirmed', props<AddEntryActionsProps<AddBSMeasureComponent>>());
}
