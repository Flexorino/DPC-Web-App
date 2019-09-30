import { DiaryListComponent } from './diary-list.component';
import { BaseSourceAction } from '../../../../shared/actions/base-source-action';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createAction, ActionCreator, props } from '@ngrx/store';
import { ExtendedAction } from 'src/shared/actions/ExtendedAction';

// any relevant events that this component can dispatch

export class DiaryListActions {
    static OPENEND = createAction('[diary-list Component] opened', props<ExtendedAction<DiaryListComponent, void>>());
    static CLOSED = createAction('[diary-list Component] closed', props<ExtendedAction<DiaryListComponent>>());
    static SCROLL = createAction('[diary-list Component] scroll', props<ExtendedAction<DiaryListComponent>>());
}
