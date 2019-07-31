import { BasicActionProps } from './../../../../shared/actions/basic-action-props';
import { AddEntryConfrimProps } from './custom-actions/AddEntryConfirmProps';
import { state } from '@angular/animations';
import { createAction, props } from '@ngrx/store';
import { AddEntryComponent } from './add-entry.component';

export class AddEntryActions {
    static CONFIRM = createAction('[AddEntry Component] confirm', props<AddEntryConfrimProps>());
    static ABORT = createAction('[AddEntry Component] abort', props<BasicActionProps<AddEntryComponent>>());
    static OPENED = createAction('[AddEntry Component] opened', props<BasicActionProps<AddEntryComponent>>());
}
