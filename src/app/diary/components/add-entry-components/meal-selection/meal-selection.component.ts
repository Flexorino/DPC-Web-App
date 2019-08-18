import { FoodPickerComponent } from './../food-picker/food-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { SettingsService } from 'src/shared/services/settings.service';
import { stringify } from '@angular/compiler/src/util';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //  const isSubmitted = form && form.submitted;
    //  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    return control.value ? !control.valid : false;
  }
}

@Component({
  selector: 'app-meal-selection',
  templateUrl: './meal-selection.component.html',
  styleUrls: ['./meal-selection.component.scss']
})
export class MealSelectionComponent implements OnInit {

  mealCalcHelpForm: FormGroup;
  extrasMatcher = new MyErrorStateMatcher();
  carbsFactor;
  @Input('group') formGroup: FormGroup;
  @Output('close') close = new EventEmitter<void>();
  @ViewChild("mealSel",{static: false}) ref : ElementRef;

  constructor(private fb: FormBuilder, private settings: SettingsService, private dialog: MatDialog) {
    this.mealCalcHelpForm = this.fb.group({
      carbsFactor: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.carbsFactor = settings.carbsFactor;
  }

  calculateKE() {
    if (this.mealCalcHelpForm.valid) {

      let u = { kek: "kekorino" };
      let Z = { 1: u, 2: u };
      alert(JSON.stringify(Z));

      try {
        let res = Number.parseFloat(this.mealCalcHelpForm.get("amount").value) * Number.parseFloat(this.mealCalcHelpForm.get("carbsFactor").value) * 0.01 * this.carbsFactor;
        res = Math.round(res);
        this.formGroup.get("KE").setValue(res);
      }
      catch (e) {

      }

    }
  }

  ngOnInit() {
  }

  closeThis() {
    this.close.next(null);
  }

  openDialog(event: Event): void {
    const dialogRef = this.dialog.open(FoodPickerComponent, {
      width: '250px',
      data: {  }
    });
    event.preventDefault();
    event.stopPropagation();
    this.ref.nativeElement.blur();
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ref.nativeElement.blur();
    });

  }

}
