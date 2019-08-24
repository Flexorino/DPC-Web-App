import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IListFoodPicker } from '../interfaces/IListFoodPicker';
import { Food } from 'src/shared/model/diary/food';
import { BehaviorSubject } from 'rxjs';
import { Diary } from 'src/web-api';

@Component({
  selector: 'app-list-food-picker',
  templateUrl: './list-food-picker.component.html',
  styleUrls: ['./list-food-picker.component.scss']
})
export class ListFoodPickerComponent implements OnInit, IListFoodPicker {
  selectedFood: BehaviorSubject<Food>;

  constructor(
    private store: Store<{ diary: Diary }>
  ) {
  }

  ngOnInit() {
  }

}
