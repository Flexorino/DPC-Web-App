import { AddEntryComponent } from './../components/add-entry/add-entry.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-diary-nav',
  templateUrl: './diary-nav.component.html',
  styleUrls: ['./diary-nav.component.scss']
})
export class DiaryNavComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openAddEntryDialog() {
    this.dialog.open(AddEntryComponent, { panelClass:'full_screen_dialog' })
  }
}
