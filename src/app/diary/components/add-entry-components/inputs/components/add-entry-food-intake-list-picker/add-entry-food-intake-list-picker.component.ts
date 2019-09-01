import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator } from '@angular/forms';
import { BehaviorSubject, Subscription, Observable, Subject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';
import { IEntryFoodIntakePicker } from '../../interfaces/IEntryFoodIntakePicker';
import { IEntryFoodIntakeListPicker } from '../../interfaces/IEntryFoodIntakeListPicker';

@Component({
  selector: 'add-entry-food-intake-list-picker',
  templateUrl: './add-entry-food-intake-list-picker.component.html',
  styleUrls: ['./add-entry-food-intake-list-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEnetryFoodIntakeListPicker), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AddEnetryFoodIntakeListPicker), multi: true }
  ]
})
export class AddEnetryFoodIntakeListPicker implements OnInit, AfterViewInit, ControlValueAccessor, Validator {

  //CONSTRUCTION
  private construction: Subject<ConstructionControlValue<Array<FoodIntakeAttribute>>> = new Subject();

  @ViewChildren("foodyMcFoodStone") foodIntakeInputs: QueryList<IEntryFoodIntakePicker>;
  group: FormGroup = new FormGroup({});

  foodIntakeSubscriptions: Array<Subscription> = [];
  foodIntakeSubjects: Array<BehaviorSubject<FoodIntakeAttribute>> = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.group.addControl("meals", this.fb.array([]))
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateFoodIntakeSubscriptions();
      this.foodIntakeInputs.changes.subscribe(y => {
        this.updateFoodIntakeSubscriptions();
      });
    });
  }


  addMeal() {
    let grp: FormGroup = this.fb.group({ KE: ['', [Validators.required, Validators.min(1), Validators.max(999)]] });
    this.meals.push(grp);
  }

  updateFoodIntakeSubscriptions() {
    this.foodIntakeSubscriptions.forEach(x => x.unsubscribe());
    this.foodIntakeSubscriptions = [];
    this.foodIntakeSubjects = [];
    this.foodIntakeInputs.forEach(x => {
      this.foodIntakeSubjects.push(x.foodIntake);
      this.foodIntakeSubscriptions.push(x.foodIntake.subscribe(x => {
        let intakes: FoodIntakeAttribute[] = [];
        this.foodIntakeSubjects.map(x => x.getValue()).filter(x => x).forEach(x => intakes.push(x));
        this.construction.next(new ConstructionControlValue(this.group.value, intakes));
      }));
    })
    console.log("update");
    let intakes: FoodIntakeAttribute[] = [];
    this.foodIntakeSubjects.map(x => x.getValue()).filter(x => x).forEach(x => intakes.push(x));
    this.construction.next(new ConstructionControlValue(this.group.value, intakes));
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

  }
  registerOnChange(fn: any): void {
    this.construction.subscribe(fn);
    // this.updateFoodIntakeSubscriptions();
  }
  registerOnTouched(fn: any): void {
  }
}
