
import { state } from '@angular/animations';
import { createAction, props } from '@ngrx/store';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { AddIngestionComponent } from './add-ingestion.component';

export class AddIngestionActions {
    static ABORT = createAction('[AddIngestion Component] abort', props<CompletableAction<AddIngestionComponent, void>>());
    static OPENED = createAction('[AddIngestion Component] opened', props<CompletableAction<AddIngestionComponent, void>>());
}
