import { DiaryNavComponent } from './diary-nav.component';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { props, createAction } from '@ngrx/store';

export class DiaryNavActions {
    static OPEN = createAction('[DiaryNav Component] open', props<CompletableAction<DiaryNavComponent, void>>());
    static CLOSE = createAction('[DiaryNav Component] close', props<CompletableAction<DiaryNavComponent, void>>());
}
