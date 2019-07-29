import { SettingsService } from './../../../../shared/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Diary } from 'src/web-api';
import { addEntryConfrim } from './add-entry.actions';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  constructor(private store: Store<{ diary: Diary }>, public dialogRef: MatDialogRef<AddEntryComponent>, private settings: SettingsService) { }
  public bsUnit: string;


  ngOnInit() {
    this.bsUnit = this.settings.getBSUnit();
  }

  public confirm(): void {
    this.dialogRef.close();
    this.store.dispatch(addEntryConfrim());
  }

  public abort() {
    this.dialogRef.close();
  }
}
