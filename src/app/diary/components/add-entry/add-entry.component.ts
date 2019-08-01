import { BasicActionProps } from './../../../../shared/actions/basic-action-props';
import { AddEntryConfrimProps } from './custom-actions/AddEntryConfirmProps';
import { SettingsService } from './../../../../shared/services/settings.service';
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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {
  // Inputs
  private date: string;
  private time: any;

  constructor(private store: Store<{ diary: Diary }>, public dialogRef:
    MatDialogRef<AddEntryComponent>, private settings: SettingsService) {

  }
  public bsUnit: string;


  ngOnInit() {
    this.bsUnit = this.settings.getBSUnit();
    let date: Date = new Date();
    this.date = date.toISOString().slice(0, 10);
    this.time = date.getHours() + ":" + date.getMinutes();
  }

  public confirm(): void {

    console.log(+new Date(this.date));
    console.log(Object.getPrototypeOf(this.time));
    let action = AddEntryActions.CONFIRM(new AddEntryConfrimProps(this, {}));
    this.store.dispatch(AddEntryActions.CONFIRM(action));
    action.then(x => this.dialogRef.close());
  }

  public abort() {
    this.store.dispatch(AddEntryActions.ABORT(new BasicActionProps(this)));
    this.dialogRef.close();
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedTags = [
    { name: 'vor dem Essen' },
    { name: 'Korrektur' },
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedTags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.selectedTags.indexOf(fruit);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }
}
