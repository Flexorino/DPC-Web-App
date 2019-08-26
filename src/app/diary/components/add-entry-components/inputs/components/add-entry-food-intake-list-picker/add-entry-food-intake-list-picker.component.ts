import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';
import { IEntryFoodIntakePicker } from '../../interfaces/IEntryFoodIntakePicker';
import { IEntryFoodIntakeListPicker } from '../../interfaces/IEntryFoodIntakeListPicker';

@Component({
  selector: 'add-entry-food-intake-list-picker',
  templateUrl: './add-entry-food-intake-list-picker.component.html',
  styleUrls: ['./add-entry-food-intake-list-picker.component.scss']
})
export class AddEnetryFoodIntakeListPicker implements OnInit, IEntryFoodIntakeListPicker, AfterViewInit {

  @ViewChildren("foodyMcFoodStone") foodIntakeInputs: QueryList<IEntryFoodIntakePicker>;
  @Input('group') group: FormGroup;

  foodIntakeSubscriptions: Array<Subscription> = [];
  foodIntakeSubjects: Array<BehaviorSubject<FoodIntakeAttribute>> = [];
  foodArray: BehaviorSubject<FoodIntakeAttribute[]> = new BehaviorSubject([]);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.group.addControl("meals", this.fb.array([]))
  }

  ngAfterViewInit(): void {
    this.updateFoodIntakeSubscriptions();
    this.foodIntakeInputs.changes.subscribe(y => {
      this.updateFoodIntakeSubscriptions();
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
        this.foodArray.next(intakes);
      }));
    })
    console.log("update");
    let intakes: FoodIntakeAttribute[] = [];
    this.foodIntakeSubjects.map(x => x.getValue()).filter(x => x).forEach(x => intakes.push(x));
    this.foodArray.next(intakes);
  }

  remove(i: number) {
    this.meals.removeAt(i);
  }

  get meals() {
    return this.group.get('meals') as FormArray;
  }
}
