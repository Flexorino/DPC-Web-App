import { filter, map, merge, } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diary } from 'src/shared/model/diary/diary';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';

@Component({
  selector: 'app-food-picker',
  templateUrl: './food-picker.component.html',
  styleUrls: ['./food-picker.component.scss']
})
export class FoodPickerComponent implements OnInit, OnDestroy {

  searchSnippet: string = "";
  food: Observable<Array<Food>>;
  private searchChange: BehaviorSubject<String> = new BehaviorSubject("");

  constructor(
    public dialogRef: MatDialogRef<FoodPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<{ diary: Diary }>
  ) { }

  ngOnInit() {
    let unfilteredFood = this.store.pipe(select('diary'), select('food'));
    let searchRes: Observable<any> = combineLatest(unfilteredFood, this.searchChange);
    this.food = searchRes.pipe(map(x => {
      let food: Array<Food> = x[0];
      let filter: string = x[1];
      return food.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()));
    }));
  }
  onNoClick() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
  }

  searchChanged(newValue) {
    console.log("change");
    this.searchChange.next(newValue);
  }
}