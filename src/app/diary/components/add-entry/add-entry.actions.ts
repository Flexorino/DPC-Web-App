import { BasicActionProps } from './../../../../shared/actions/basic-action-props';
import { AddEntryConfrimProps } from './custom-actions/AddEntryConfirmProps';
import { state } from '@angular/animations';
import { createAction, props } from '@ngrx/store';
import { AddEntryComponent } from './add-entry.component';
import { CompletableAction } from 'src/shared/actions/CompletableAction';

export class AddEntryActions {
    static CONFIRM = createAction('[AddEntry Component] confirm', props<AddEntryConfrimProps>());
    static ABORT = createAction('[AddEntry Component] abort', props<CompletableAction<AddEntryComponent, void>>());
    static OPENED = createAction('[AddEntry Component] opened', props<CompletableAction<AddEntryComponent, void>>());
}
