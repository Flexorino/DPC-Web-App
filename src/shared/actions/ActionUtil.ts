import { ExtendedAction } from './ExtendedAction';
import { Store, ActionCreator } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import { Tag } from '../model/diary/tag';
import { takeUntil, take } from 'rxjs/operators';

export class ActionUtil {
    public static dispatch = <T, R, D, C>(store: Store<any>, creator: ActionCreator<any, any>, action: ExtendedAction<T, R, D, C>, cancel?: Observable<any>): ExtendedAction<T, R, D, C> => {
        store.dispatch(creator(action));
        if (cancel) {
            cancel.pipe(takeUntil(from(action.promise)), take(1)).subscribe(() => action.cancel(null));
        }
        return action;
    }
}