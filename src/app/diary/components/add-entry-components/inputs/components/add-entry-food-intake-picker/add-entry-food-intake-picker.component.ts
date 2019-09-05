import { ConstructionConstrol } from './../../../../../../../shared/util/construction-control';
import { FoodIntakeAttribute } from './../../../../../../../shared/model/diary/entry/attributes/food-intake-attribute';
import { FoodInfoShowerPopupwrapperComponentInput } from './../../../../../../../shared/components/food-info-shower-popupwrapper/food-info-shower-popupwrapper.component';
import { FoodInfoShowerPopupwrapperComponent } from 'src/shared/components/food-info-shower-popupwrapper/food-info-shower-popupwrapper.component';
import { AddEntryFoodSelectionDecider, AddEntryFoodSelectionDeciderInput } from '../add-entry-food-selection-decider/add-entry-food-selection-decider.component';
import { IEntryFoodIntakePicker } from '../../interfaces/IEntryFoodIntakePicker';
import { BehaviorSubject, Subject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { SettingsService } from 'src/shared/services/settings.service';
import { Store, select } from '@ngrx/store';
import { Diary } from 'src/web-api';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { map, delay } from 'rxjs/operators';
import { group } from '@angular/animations';

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
  styleUrls: ['./add-entry-food-intake-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEntryFoodIntakePicker), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AddEntryFoodIntakePicker), multi: true }
  ]
})
export class AddEntryFoodIntakePicker implements OnInit, Validator, ControlValueAccessor {

  formGroup: FormGroup = new FormGroup({});

  //CONSTRUCTION
  private construction: Subject<ConstructionControlValue<FoodIntakeAttribute>> = new Subject();

  //CONTROLS
  private keAmoutControl = new FormControl();
  private selectedFoodControl = new FormControl();
  private helpKHPartControl = new FormControl();
  private helpKHAmountControl = new FormControl();

  //MISC
  private internHelpKHPartControl = new FormControl();
  private internHelpKHAmountControl = new FormControl();

  @Output("close") close = new EventEmitter();
  @ViewChild("mealSel", { static: false }) ref: ElementRef;

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
    this.formGroup.addControl('KE', this.keAmoutControl);
    this.formGroup.addControl('foodForm', this.selectedFoodControl);
    this.formGroup.addControl('help1', this.helpKHAmountControl);
    this.formGroup.addControl('help2', this.helpKHPartControl);
    let obs = this.formGroup.valueChanges.pipe(delay(0), map((() => {
      if (!this.keAmoutControl.value && !this.selectedFoodControl.value) {
        return new ConstructionControlValue(this.formGroup.value, null);
      }
      let intake = new FoodIntakeAttribute();
      intake.amount = null;
      intake.food = null;
      try {
        intake.amount = this.keAmoutControl.value ? this.keAmoutControl.value : 0 / this.keFactor;
        intake.food = this.selectedFoodControl.value;
      } catch (e) {
        console.error("err");
      }
      return new ConstructionControlValue(this.formGroup.value, intake);
    })));
    obs.subscribe(x => this.construction.next(x));
    obs.subscribe((x: ConstructionControlValue<FoodIntakeAttribute>) => {
      if (x.constructed) {
        this.currentSelectedFood = x.constructed.food;
      } else {
        this.currentSelectedFood = null;
      }
    });
    // this form is only for intern help usage!
    let internCarbsPartHelpter = new FormControl('', [Validators.required, Validators.max(100), Validators.min(1)]);
    let internCarbsAmoutHelper = new FormControl('', [Validators.required, Validators.min(1)]);
    this.internHelpKHAmountControl = internCarbsAmoutHelper;
    this.internHelpKHPartControl = internCarbsPartHelpter;
    this.mealCalcHelpForm = this.fb.group({
      carbsFactor: internCarbsPartHelpter,
      amount: internCarbsAmoutHelper
    });
    this.mealCalcHelpForm.get('carbsFactor').valueChanges.subscribe(x => {
      if (this.mealCalcHelpForm.get('carbsFactor').valid) {
        this.carbsFactor = Number.parseFloat(this.mealCalcHelpForm.get("carbsFactor").value) * 0.01;
      }
    });
    internCarbsAmoutHelper.valueChanges.subscribe(x => this.helpKHAmountControl.setValue(internCarbsAmoutHelper.value));
    internCarbsPartHelpter.valueChanges.subscribe(x => this.helpKHPartControl.setValue(internCarbsPartHelpter.value));
  }

  closeThis() {
    this.close.next(null);
  }

  removeFood() {
    this.selectedFoodControl.setValue(null);
  }

  openDialog(event: Event): void {
    const dialogRef = this.dialog.open(AddEntryFoodSelectionDecider, {
      width: '95%',
      height: '95%',
      data: new AddEntryFoodSelectionDeciderInput(this.selectedFoodControl.value), panelClass: "full_screen_dialog"
    });
    event.preventDefault();
    event.stopPropagation();
    dialogRef.componentInstance.food.subscribe(x => {
      if (x) {
        this.mealCalcHelpForm.get("carbsFactor").setValue(x.carbsFactor ? (x.carbsFactor * 100).toFixed(1) : null);
        this.carbsFactor = x.carbsFactor;
        this.selectedFoodControl.setValue(x);
      }
    });
    dialogRef.afterClosed().subscribe(x => setTimeout(x => this.ref.nativeElement.blur(), 1));
  }

  showFoodInfo() {
    const dialogRef = this.dialog.open(FoodInfoShowerPopupwrapperComponent, {
      width: '80%',
      data: new FoodInfoShowerPopupwrapperComponentInput(this.selectedFoodControl.value), panelClass: "full_screen_dialog"
    });
  }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    return this.formGroup.valid ? null : { curruptedControlState: null };
  }

  writeValue(obj: any): void {
    if (!obj) {
      this.setToInitial();
      return;
    }
    if (!(obj instanceof ConstructionControlValue)) {
      throw new Error("Invalid Value");
    } else if (obj.raw) {
      this.formGroup.setValue(obj.raw);
      this.internHelpKHAmountControl.setValue(this.helpKHAmountControl.value );
      this.internHelpKHPartControl.setValue(this.helpKHPartControl.value);
    } else {
      throw new Error("not implemented");
    }
  }

  setToInitial() {
    this.formGroup.reset();

  }

  registerOnChange(fn: any): void {
    this.construction.subscribe(fn);
    this.formGroup.setValue(this.formGroup.value);
  }
  registerOnTouched(fn: any): void {
  }

}
