import { AddEntryFoodSelectionDecider, AddEntryFoodSelectionDeciderInput } from '../add-entry-food-selection-decider/add-entry-food-selection-decider.component';
import { IEntryFoodIntakePicker } from '../../interfaces/IEntryFoodIntakePicker';
import { BehaviorSubject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { SettingsService } from 'src/shared/services/settings.service';
import { Store, select } from '@ngrx/store';
import { Diary } from 'src/web-api';
import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //  const isSubmitted = form && form.submitted;
    //  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    return control.value ? !control.valid : false;
  }
}

@Component({
  selector: 'add-entry-food-intake-picker',
  templateUrl: './add-entry-food-intake-picker.component.html',
  styleUrls: ['./add-entry-food-intake-picker.component.scss']
}) 
export class AddEntryFoodIntakePicker implements OnInit, IEntryFoodIntakePicker {

  @Output("close") close = new EventEmitter();
  @Input('group') formGroup: FormGroup;
  @ViewChild("mealSel", { static: false }) ref: ElementRef;

  foodIntake: BehaviorSubject<FoodIntakeAttribute> = new BehaviorSubject({ food: null, amount: null });

  mealCalcHelpForm: FormGroup;
  extrasMatcher = new MyErrorStateMatcher();
  keFactor: number;
  currentSelectedFood: Food = null;
  carbsFactor: number;
  eatenCarbs: number;

  foodFormGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private settings: SettingsService, private dialog: MatDialog, private store: Store<{ diary: Diary }>) {
    this.keFactor = this.settings.carbsFactorSubj.getValue();
  }

  calculateKE() {
    if (this.mealCalcHelpForm.valid) {
      try {
        let res = Number.parseFloat(this.mealCalcHelpForm.get("amount").value) * this.carbsFactor * this.keFactor;
        res = Math.round(res);
        this.formGroup.get("KE").setValue(res);
      }
      catch (e) {
        console.error("Fehler beim Berechnen der KE!")
      }
    }
  }

  ngOnInit() {
    this.formGroup.addControl('KE', this.fb.control(''));
    this.formGroup.addControl('foodForm', this.foodFormGroup);
    this.formGroup.get("KE").valueChanges.subscribe(x => {
      try {
        this.eatenCarbs = Number.parseInt(x) / this.keFactor;
        this.foodIntake.next({ food: this.currentSelectedFood, amount: this.eatenCarbs });

      } catch (e) {
        console.error("err");
      }
    });
    // this form is only for intern help usage!
    this.mealCalcHelpForm = this.fb.group({
      carbsFactor: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.mealCalcHelpForm.get('carbsFactor').valueChanges.subscribe(x => {
      if (this.mealCalcHelpForm.get('carbsFactor').valid) {
        this.carbsFactor = Number.parseFloat(this.mealCalcHelpForm.get("carbsFactor").value) * 0.01;
      }
    });


  }

  closeThis() {
    this.close.next(null);
  }

  removeFood() {
    this.currentSelectedFood = null;
    this.foodIntake.next({ food: this.currentSelectedFood, amount: this.eatenCarbs });
  }

  openDialog(event: Event): void {
    const dialogRef = this.dialog.open(AddEntryFoodSelectionDecider, {
      width: '80%',
      height: '600px',
      data: new AddEntryFoodSelectionDeciderInput(this.currentSelectedFood, this.foodFormGroup), panelClass: "full_screen_dialog"
    });
    event.preventDefault();
    event.stopPropagation();
    dialogRef.componentInstance.food.subscribe(x => {
      this.currentSelectedFood = x;
      if (x) {
        this.mealCalcHelpForm.get("carbsFactor").setValue(x.carbsFactor ? (x.carbsFactor * 100).toFixed(1) : null);
        this.carbsFactor = x.carbsFactor;
        this.foodIntake.next({ food: x, amount: this.eatenCarbs })
      }
    });
    dialogRef.afterClosed().subscribe(x =>       setTimeout(x => this.ref.nativeElement.blur(), 1));
  }

}
