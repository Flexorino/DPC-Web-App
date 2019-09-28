import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export class NotImplementedMessage {
  constructor(public text: string) { }
}
@Component({
  selector: 'app-not-implemented',
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.scss']
})
export class NotImplementedComponent implements OnInit {

  public text: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: NotImplementedMessage, public dialogRef: MatDialogRef<NotImplementedComponent>,
  ) {
    this.text = data.text;
  }

  ngOnInit() {
  }

  close(){
      this.dialogRef.close();
  }

}
