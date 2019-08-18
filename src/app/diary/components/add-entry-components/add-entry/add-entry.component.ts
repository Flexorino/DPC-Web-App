import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { BasicActionProps } from '../../../../../shared/actions/basic-action-props';
import { AddEntryConfrimProps } from './custom-actions/AddEntryConfirmProps';
import { SettingsService } from '../../../../../shared/services/settings.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Diary } from 'src/web-api';
import { AddEntryActions } from './add-entry.actions';
import { Observable } from 'rxjs';
import { Input } from '@angular/compiler/src/core';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, NgForm } from '@angular/forms';
import { EntryInputData } from './entry-input-data';
import { EntryInputConversionService } from './entry-input-conversion.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss'],
  providers: [EntryInputConversionService]
})
export class AddEntryComponent implements OnInit {
  // Inputs
  private entryData: EntryInputData;

  get diagnostic() { return JSON.stringify(this.entryData); }

  @ViewChild('form', { static: false }) form: NgForm;

  private fullLoaded = false;
  private tags: Array<any> = [{ name: "kek", id: "asd" }, { name: "kek2", id: "asd2" }];

  constructor(private store: Store<{ diary: Diary }>, public dialogRef:
    MatDialogRef<AddEntryComponent>, private settings: SettingsService, private conversionService: EntryInputConversionService) {

  }
  public bsUnit: string;


  ngOnInit() {
    console.log(this.form);
    let action = AddEntryActions.OPENED(new CompletableAction(this));
    this.store.dispatch(action);
    action.then(x => this.fullLoaded = true);

    this.bsUnit = this.settings.getBSUnit();
    let date: Date = new Date();
    this.entryData = new EntryInputData(date.toISOString().slice(0, 10), date.getHours() + ":" + date.getMinutes());

  }

  public confirm(): void {

    if (this.form.valid) {
      const entryToCreate = this.conversionService.convertToEntry(this.entryData);
      const action = AddEntryActions.CONFIRM(new AddEntryConfrimProps(this, entryToCreate));
      this.store.dispatch(AddEntryActions.CONFIRM(action));
      action.then(x => this.dialogRef.close());

    } else {
      alert('Eingaben ungültig');
    }
  }

  public abort() {
    this.store.dispatch(AddEntryActions.ABORT(new CompletableAction(this)));
    this.dialogRef.close();
  }
}
