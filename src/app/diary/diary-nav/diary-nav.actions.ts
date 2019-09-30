import { DiaryNavComponent } from './diary-nav.component';
import { ExtendedAction } from 'src/shared/actions/ExtendedAction';
import { props, createAction } from '@ngrx/store';

export class DiaryNavActions {
    static OPEN = createAction('[DiaryNav Component] open', props<ExtendedAction<DiaryNavComponent, void>>());
    static CLOSE = createAction('[DiaryNav Component] close', props<ExtendedAction<DiaryNavComponent, void>>());
}
