
import { BasicActionProps } from './../../../../../shared/actions/basic-action-props';
import { AddEntryComponent } from '../add-entry.component';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { EntryInputData } from '../entry-input-data';
import { Entry } from 'src/shared/model/diary/entry/entry';

export class AddEntryConfrimProps extends CompletableAction<AddEntryComponent, void> {
    constructor(source: AddEntryComponent, public entry: Entry) {
        super(source);
    }
}
