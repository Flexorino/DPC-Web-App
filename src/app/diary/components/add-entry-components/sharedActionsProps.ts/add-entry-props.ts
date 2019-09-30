import { ExtendedAction } from 'src/shared/actions/ExtendedAction';
import { Entry } from 'src/shared/model/diary/entry/entry';
export class AddEntryActionsProps<T> extends ExtendedAction<T, void> {

    constructor(source: T, public readonly entryToAdd: Entry) {
        super(source);
    }
}
