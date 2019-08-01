
import { BasicActionProps } from './../../../../../shared/actions/basic-action-props';
import { AddEntryComponent } from '../add-entry.component';
import { CompletableAction } from 'src/shared/actions/CompletableAction';

export class AddEntryConfrimProps extends CompletableAction<AddEntryComponent, void> {
    constructor(source: AddEntryComponent, public entryInformation: any) {
        super(source);
    }
}
