import { DiaryListComponent } from './diary-list.component';
import { BasicActionProps } from './../../../../shared/actions/basic-action-props';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createAction, ActionCreator, props } from '@ngrx/store';

// any relevant events that this component can dispatch

export class DiaryListActions {
    static OPENEND = createAction('[diary-list Component] opened', props<BasicActionProps<DiaryListComponent>>());
    static CLOSED = createAction('[diary-list Component] closed', props<BasicActionProps<DiaryListComponent>>());
    static SCROLL = createAction('[diary-list Component] scroll', props<BasicActionProps<DiaryListComponent>>());
}
