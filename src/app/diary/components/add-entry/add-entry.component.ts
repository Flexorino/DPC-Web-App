import { BasicActionProps } from './../../../../shared/actions/basic-action-props';
import { AddEntryConfrimProps } from './custom-actions/AddEntryConfirmProps';
import { SettingsService } from './../../../../shared/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Diary } from 'src/web-api';
import { AddEntryActions } from './add-entry.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  constructor(private store: Store<{ diary: Diary }>, public dialogRef:
    MatDialogRef<AddEntryComponent>, private settings: SettingsService) { }
  public bsUnit: string;


  ngOnInit() {
    this.bsUnit = this.settings.getBSUnit();
  }

  public confirm(): void {
    this.store.dispatch(AddEntryActions.CONFIRM(new AddEntryConfrimProps(this, {})));
    this.dialogRef.close();

  }

  public abort() {
    this.store.dispatch(AddEntryActions.ABORT(new BasicActionProps(this)));
    this.dialogRef.close();
  }
}
