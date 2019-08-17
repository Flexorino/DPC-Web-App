import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { SettingsService } from 'src/shared/services/settings.service';

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


  constructor(private fb: FormBuilder, private settings: SettingsService) {
    this.mealCalcHelpForm = this.fb.group({
      carbsFactor: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.carbsFactor = settings.carbsFactor;
  }

  calculateKE() {
    if (this.mealCalcHelpForm.valid) {
      try {
        let res = Number.parseFloat(this.mealCalcHelpForm.get("amount").value) * Number.parseFloat(this.mealCalcHelpForm.get("carbsFactor").value)* 0.01 * this.carbsFactor;
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

}
