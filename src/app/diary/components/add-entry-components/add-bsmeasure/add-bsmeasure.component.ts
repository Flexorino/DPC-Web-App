import { DiaryNavigationService } from './../../../../../shared/services/diary.navigation.service';
import { FullScreenModalCloser } from 'src/shared/components/base-full-screen-modal/full_screen_closer.service';
import { FormService } from './../../../../../shared/services/form-service';
import { Validators } from '@angular/forms';
import { ConstructionConstrol } from './../../../../../shared/util/construction-control';
import { Component, OnInit } from '@angular/core';
import { AddBSMeasreActions } from './add-bsmeasure.actions';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { Store } from '@ngrx/store';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { AddIngestionActions } from '../add-ingestion/add-ingestion.actions';
import { DepthNavigationService } from 'src/shared/services/depth-navigation.service';

@Component({
  selector: 'app-add-bsmeasure',
  templateUrl: './add-bsmeasure.component.html',
  styleUrls: ['./add-bsmeasure.component.scss'],
  providers: [FormService]
})
export class AddBSMeasureComponent implements OnInit {

  //CONTROL
  entryControl: ConstructionConstrol<Entry> = new ConstructionConstrol(null, Validators.required);

  //MISC
  loading = true;

  constructor(private store: Store<any>, private deepNav: DepthNavigationService, private formServie: FormService, private modalCloser: FullScreenModalCloser, private diaryNav: DiaryNavigationService) { }

  ngOnInit(): void {
    this.handleActionForInit();
    this.formServie.submitRequest.subscribe(() => console.log("SUBMIT"));
    this.formServie.formLeave.subscribe(() => this.deepNav.goDeep(this.entryControl.value));
    this.modalCloser.closeSubject.subscribe(() => this.deepNav.back(this.diaryNav.currentDiaryId$.getValue()));
  }

  private handleActionForInit() {
    //this view throws this action from which all required data for the sub-controls should be loaded!
    let action = AddBSMeasreActions.OPENED(new CompletableAction(this));
    this.store.dispatch(action);
    action.then(() => this.loading = false);
    if (this.deepNav.recoverData) {
      this.entryControl.setValue(this.deepNav.recoverData);
    }
  }

}
