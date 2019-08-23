import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { IEntryFoodPickker } from '../../interfaces/IEntryFoodPicker';
import { BehaviorSubject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';

@Component({
  selector: 'app-add-entry-food-picker',
  templateUrl: './add-entry-food-picker.component.html',
  styleUrls: ['./add-entry-food-picker.component.scss']
})
export class AddEntryFoodPickerComponent implements OnInit, IEntryFoodPickker {
  foodArray: BehaviorSubject<FoodIntakeAttribute[]> = new BehaviorSubject([]);

  @Input('group') group: FormGroup;

  sum = 0;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.group.addControl("meals", this.fb.array([]))
    this.addMeal();
  }

  addMeal() {
    let grp: FormGroup = this.fb.group({ KE: [], });
    grp.get("KE").valueChanges.subscribe(x => {
      this.calculateMealSum();
    });
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
