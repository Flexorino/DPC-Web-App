import { CustomValidators } from './../../../misc/custom-validators';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription, Observable, Subject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';
import { IEntryFoodIntakePicker } from '../../interfaces/IEntryFoodIntakePicker';
import { IEntryFoodIntakeListPicker } from '../../interfaces/IEntryFoodIntakeListPicker';
import { map, filter, delay } from 'rxjs/operators';

@Component({
  selector: 'add-entry-food-intake-list-picker',
  templateUrl: './add-entry-food-intake-list-picker.component.html',
  styleUrls: ['./add-entry-food-intake-list-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEnetryFoodIntakeListPicker), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AddEnetryFoodIntakeListPicker), multi: true }
  ]
})
export class AddEnetryFoodIntakeListPicker implements OnInit, ControlValueAccessor, Validator {

  //CONSTRUCTION
  private construction: Subject<ConstructionControlValue<Array<FoodIntakeAttribute>>> = new Subject();

  group: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.group.addControl("meals", this.fb.array([]));
    let obs = this.group.valueChanges.pipe(delay(0), map(() => {
      let intakes = [];
      this.meals.controls.forEach(element => {
        if (element.get("foodIntake").value && element.get("foodIntake").value.constructed) {
          intakes.push(element.get("foodIntake").value.constructed);
        }
      });
      return new ConstructionControlValue(this.group.value, intakes);
    }
    ));
    obs.subscribe((x: ConstructionControlValue<FoodIntakeAttribute[]>) => this.construction.next(x));
  }

  addMeal(): FormGroup {
    let grp: FormGroup = this.fb.group({});
    grp.addControl('foodIntake', new FormControl(null, [CustomValidators.required]))
    this.meals.push(grp);
    return grp;
  }

  remove(i: number) {
    this.meals.removeAt(i);
  }

  get meals() {
    return this.group.get('meals') as FormArray;
  }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    return this.group.valid ? null : { curruptedControlState: null };
  }

  writeValue(obj: any): void {

    if (!obj) {
      this.setToInitial();
      return;
    }
    if (!(obj instanceof ConstructionControlValue)) {
      throw new Error("Invalid Value");
    } else if (obj.raw) {
      obj.raw.meals.forEach(element => {
        this.addMeal().setValue(element);
      });
    } else {
      throw new Error("not implemented");
    }
  }

  private setToInitial() {
    while (this.meals.length) {
      this.meals.removeAt(0);
    }
  }

  registerOnChange(fn: any): void {
    this.construction.subscribe(fn);
    this.group.setValue(this.group.value);
  }
  registerOnTouched(fn: any): void {
  }
}
