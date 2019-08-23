import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';
import { IEntryFoodIntakePicker } from '../../interfaces/IEntryFoodIntakePicker';
import { IEntryFoodIntakeListPicker } from '../../interfaces/IEntryFoodIntakeListPicker';

@Component({
  selector: 'app-add-entry-food-picker',
  templateUrl: './add-entry-food-picker.component.html',
  styleUrls: ['./add-entry-food-picker.component.scss']
})
export class AddEntryFoodPickerComponent implements OnInit, IEntryFoodIntakeListPicker, AfterViewInit {

  @ViewChildren("foodyMcFoodStone") foodIntakeInputs: QueryList<IEntryFoodIntakePicker>;
  @Input('group') group: FormGroup;

  foodIntakeSubscriptions: Array<Subscription> = [];
  foodIntakeSubjects: Array<BehaviorSubject<FoodIntakeAttribute>> = [];
  foodArray: BehaviorSubject<FoodIntakeAttribute[]> = new BehaviorSubject([]);
  sum = 0;


  ngAfterViewInit(): void {
    this.updateFoodIntakeSubscriptions();
    this.foodIntakeInputs.changes.subscribe(y => {
      this.updateFoodIntakeSubscriptions();
    });
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
        console.log("CHANGE: "+JSON.stringify(this.foodArray))
      }));
    })

  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.group.addControl("meals", this.fb.array([]))
    this.addMeal();

  }

  addMeal() {
    let grp: FormGroup = this.fb.group({ KE: [], });
    this.meals.push(grp);
  }

  remove(i: number) {
    this.meals.removeAt(i);
    this.calculateMealSum();
  }

  private calculateMealSum() {
    if (this.meals.controls.length === 0) {
      this.sum = 0;
    } else {
      this.sum = this.meals.controls.map(element => {
        try {
          if (!element.get("KE").value) {
            return 0;
          }
          return Number.parseFloat(element.get("KE").value);
        } catch (e) {
          return 0;
        }
      }).reduce((x, y) => x + y);
    }
  }

  get meals() {
    let z = this.group.get('meals') as FormArray;
    return z;
  }

}
