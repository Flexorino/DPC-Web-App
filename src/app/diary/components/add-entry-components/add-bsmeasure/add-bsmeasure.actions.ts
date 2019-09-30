import { AddBSMeasureComponent } from './add-bsmeasure.component';
import { createAction, props } from '@ngrx/store';
import { ExtendedAction } from 'src/shared/actions/ExtendedAction';
import { AddEntryActionsProps } from '../sharedActionsProps.ts/add-entry-props';

export class AddBSMeasreActions {
    static ABORT = createAction('[AddBSMeasure Component] abort', props<ExtendedAction<AddBSMeasureComponent, void>>());
    static OPENED = createAction('[AddBSMeasure Component] opened', props<ExtendedAction<AddBSMeasureComponent, void>>());
    static CONFIRM = createAction('[AddBSMeasure Component] confirmed', props<AddEntryActionsProps<AddBSMeasureComponent>>());
}
