import { SettingsService } from './../../../../shared/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEntryComponent>, private settings: SettingsService) { }
  public bsUnit : string;


  ngOnInit() {
    this.bsUnit = this.settings.getBSUnit();
  }

  public confirm(): void{
    this.dialogRef.close();
  }

  public abort(){
    this.dialogRef.close();
  }
}
