import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export class AddDiaryFormInfo {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-diary-name-pop-up',
  templateUrl: './diary-name-pop-up.component.html',
  styleUrls: ['./diary-name-pop-up.component.scss']
})
export class DiaryNamePopUpComponent implements OnInit {

  public group: FormGroup;

  constructor(public dialogRef: MatDialogRef<DiaryNamePopUpComponent>, private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.group = this.fb.group({ name: this.fb.control("", [Validators.required, Validators.minLength(4), Validators.maxLength(30)]) });
  }

  onSubmit() {
    this.dialogRef.close(new AddDiaryFormInfo(this.group.get("name").value));
  }

  abort(){
    this.dialogRef.close();
  }

  close() {
    
  }
}
