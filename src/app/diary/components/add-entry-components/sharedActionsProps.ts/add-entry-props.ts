import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { Entry } from 'src/shared/model/diary/entry/entry';
export class AddEntryActionsProps<T> extends CompletableAction<T, void> {

    constructor(source: T, public readonly entryToAdd: Entry) {
        super(source);
    }
}
