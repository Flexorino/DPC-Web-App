import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Food } from 'src/shared/model/diary/food';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Diary } from 'src/web-api';
import { map } from 'rxjs/operators';
import { IEntryFoodPicker } from '../interfaces/IEntryFoodPicker';

@Component({
  selector: 'app-list-food-picker',
  templateUrl: './list-food-picker.component.html',
  styleUrls: ['./list-food-picker.component.scss']
})
export class ListFoodPickerComponent implements OnInit, IEntryFoodPicker {
  food: BehaviorSubject<Food> = new BehaviorSubject(null);
  currentSelectedFood: Food = null;
  searchSnippet: string = ""
  filteredFood: Observable<Array<Food>>;
  searchChange: BehaviorSubject<String> = new BehaviorSubject("");

  @Input("currentlySelecteFood") currentlySelecteFood: Food;

  constructor(
    private store: Store<{ diary: Diary }>
  ) {
  }

  ngOnInit() {
    setTimeout(() => this.init());
  }

  init() {
    let unfilteredFood = this.store.pipe(select('diary'), select('food'));
    let searchRes: Observable<any> = combineLatest(unfilteredFood, this.searchChange);
    this.filteredFood = searchRes.pipe(map(x => {
      let food: Array<Food> = x[0];
      let filter: string = x[1];
      return food.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    }));
    if (this.currentlySelecteFood) {
      this.currentSelectedFood = this.currentlySelecteFood;
      this.food.next(this.currentSelectedFood);
    }
  }

  searchChanged(newValue) {
    console.log("change");
    this.searchChange.next(newValue);
  }

  selectFood(food: Food) {
    this.currentSelectedFood = food;
    this.food.next(this.currentSelectedFood);
  }

}
