
import { BasicActionProps } from './../../../../../shared/actions/basic-action-props';
import { AddEntryComponent } from '../add-entry.component';

export class AddEntryConfrimProps extends BasicActionProps<AddEntryComponent> {
    constructor(source: AddEntryComponent, public entryInformation: any) {
        super(source);
    }
}
