import { BasicActionProps } from './../../../../shared/actions/basic-action-props';
import { AddEntryConfrimProps } from './custom-actions/AddEntryConfirmProps';
import { SettingsService } from './../../../../shared/services/settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Diary } from 'src/web-api';
import { AddEntryActions } from './add-entry.actions';
import { Observable } from 'rxjs';
import { Input } from '@angular/compiler/src/core';

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
    MatDialogRef<AddEntryComponent>, private settings: SettingsService) { }
  public bsUnit: string;


  ngOnInit() {
    this.bsUnit = this.settings.getBSUnit();
    let date: Date = new Date();
    this.date = date.toISOString().slice(0, 10);
    this.time = date.getHours() + ":" + date.getMinutes();
  }

  public confirm(): void {
    this.store.dispatch(AddEntryActions.CONFIRM(new AddEntryConfrimProps(this, {})));
    console.log(+new Date(this.date));
    console.log(Object.getPrototypeOf(this.time));
    this.dialogRef.close();

  }

  public abort() {
    this.store.dispatch(AddEntryActions.ABORT(new BasicActionProps(this)));
    this.dialogRef.close();
  }
}
