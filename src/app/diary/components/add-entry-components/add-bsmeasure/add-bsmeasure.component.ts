import { NavUtil } from 'src/shared/util/navigation.util';
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
import { AddEntryActionsProps } from '../sharedActionsProps.ts/add-entry-props';
import { CustomValidators } from '../misc/custom-validators';

@Component({
  selector: 'app-add-bsmeasure',
  templateUrl: './add-bsmeasure.component.html',
  styleUrls: ['./add-bsmeasure.component.scss'],
  providers: [FormService]
})
export class AddBSMeasureComponent implements OnInit {

  //CONTROL
  entryControl: ConstructionConstrol<Entry> = new ConstructionConstrol(null, CustomValidators.required);

  //MISC
  loading = true;

  constructor(private store: Store<any>, private deepNav: DepthNavigationService, private formServie: FormService, private modalCloser: FullScreenModalCloser, private navUtil: NavUtil) { }

  ngOnInit(): void {
    this.handleActionForInit();
    this.formServie.submitRequest.subscribe(() => this.handleSubmit());
    this.formServie.formLeave.subscribe(() => this.deepNav.goDeep(this.entryControl.value));
    this.modalCloser.closeSubject.subscribe(() => this.deepNav.back(this.navUtil.defaultNavigationRoute));
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

  private handleSubmit(){
    if(!this.entryControl.valid){
      alert("Eingabe fehlerhat!");
      return;
    }
    let action = new AddEntryActionsProps(this, new Entry(123));
    this.store.dispatch(AddBSMeasreActions.CONFIRM(action));
    this.loading = true;
    action.then(x => this.deepNav.back(this.navUtil.defaultNavigationRoute)).catch(err => {
      console.error(err);
      alert(err+ "Ein Fehler ist aufgetreten. Bitte versuchen Sie es päter erneut");
      this.loading = false;
    });
  }

}
