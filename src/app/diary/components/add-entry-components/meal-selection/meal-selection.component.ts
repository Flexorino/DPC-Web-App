import { Observable, Subject, pipe } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { FoodPickerComponent, DBFoodSelectedResult } from './../food-picker/food-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { SettingsService } from 'src/shared/services/settings.service';
import { stringify } from '@angular/compiler/src/util';
import { Patcherino } from 'src/shared/services/patcherino/patcherino';
import { Patch } from 'src/shared/services/patcherino/patch';
import { JJ } from 'src/shared/test';
import { Store, select } from '@ngrx/store';
import { Diary } from 'src/web-api';
import { withLatestFrom, map, filter, tap } from 'rxjs/operators';

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
  carbPortionFactor: Observable<number | string>;


  @Input('group') formGroup: FormGroup;
  @Output('close') close = new EventEmitter<void>();
  @ViewChild("mealSel", { static: false }) ref: ElementRef;

  currentSelectedFood: Observable<Food> = null;

  currentSelectedFoodName;

  foodPickerAnswer: Subject<any> = new Subject();


  constructor(private fb: FormBuilder, private settings: SettingsService, private dialog: MatDialog, private store: Store<{ diary: Diary }>) {
    this.mealCalcHelpForm = this.fb.group({
      carbsFactor: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.carbsFactor = settings.carbsFactor;
    let unfilteredFood = this.store.pipe(select('diary'), select('food'));
    this.currentSelectedFood = this.foodPickerAnswer.pipe(withLatestFrom(unfilteredFood), map(
      x => {
        let pickerAnswer = x[0];
        let food: Array<Food> = x[1];
        if (pickerAnswer instanceof DBFoodSelectedResult) {
          return food.find(x => x.id === pickerAnswer.id);
        }
      }

    ));
    this.carbPortionFactor = this.currentSelectedFood.pipe(map((x: Food) => x.carbsFactor ? Math.floor(x.carbsFactor * 100) : ''),
      tap(x => this.mealCalcHelpForm.get("carbsFactor").setValue(x)));
    this.currentSelectedFoodName = this.currentSelectedFood.pipe(map(x => x.name));
  }

  calculateKE() {
    if (this.mealCalcHelpForm.valid) {

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
      width: '80%',
      height: '600px',
      data: {}, panelClass: "full_screen_dialog"
    });
    event.preventDefault();
    event.stopPropagation();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.foodPickerAnswer.next(result);
      }
      setTimeout(() => this.ref.nativeElement.blur(), 10);
    });

  }

}
