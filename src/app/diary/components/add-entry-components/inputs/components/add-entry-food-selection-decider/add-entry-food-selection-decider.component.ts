import { FormGroup } from '@angular/forms';

import { filter, map, merge, } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Inject, OnDestroy, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diary } from 'src/shared/model/diary/diary';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { IEntryFoodPicker } from '../../interfaces/IEntryFoodPicker';
import { Food } from 'src/shared/model/diary/food';


enum PickMode {
  DB, CUSTOM
}

export class AddEntryFoodSelectionDeciderInput {
  constructor(public readonly food: Food, public readonly: FormGroup){}
}

@Component({
  selector: 'add-entry-food-selection-decider',
  templateUrl: './add-entry-food-selection-decider.component.html',
  styleUrls: ['./add-entry-food-selection-decider.component.scss']
})


export class AddEntryFoodSelectionDecider implements OnInit, OnDestroy, IEntryFoodPicker {
  food: BehaviorSubject<Food> = new BehaviorSubject(null);

  searchSnippet: string = ""
  filteredFood: Observable<Array<Food>>;
  private searchChange: BehaviorSubject<String> = new BehaviorSubject("");
  private mode: PickMode = PickMode.DB;
  private currentSelectedFood: Food = null;
  selectedTabIndex: number;

  get isValid(): boolean {
    return this.mode === PickMode.DB && this.currentSelectedFood !== null ? true : false;
  }

  constructor(
    public dialogRef: MatDialogRef<AddEntryFoodSelectionDeciderInput>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AddEntryFoodSelectionDeciderInput,
    private store: Store<{ diary: Diary }>
  ) {
  }

  ngOnInit() {
    if (this.data.food && !this.data.food.id) {
      this.selectedTabIndex = 1;
    } else if (this.data.food && this.data.food.id) {
      this.currentSelectedFood = this.data.food;
    }
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
  }
  onNoClick() {
    this.dialogRef.close();
    this.food.complete();
  }

  ngOnDestroy(): void {
  }

  searchChanged(newValue) {
    console.log("change");
    this.searchChange.next(newValue);
  }

  selectFood(food: Food) {
    this.currentSelectedFood = food;
  }

  onSubmit() {
    this.dialogRef.close();
    this.food.next(this.currentSelectedFood);
    this.food.complete();
  }
}
