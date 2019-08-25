import { Food } from './../../model/diary/food';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export class FoodInfoShowerPopupwrapperComponentInput {
  constructor(public readonly food: Food) {
    if (!food) {
      throw new Error("food should not be null");
    }
  }
}

@Component({
  selector: 'app-food-info-shower-popupwrapper',
  templateUrl: './food-info-shower-popupwrapper.component.html',
  styleUrls: ['./food-info-shower-popupwrapper.component.scss']
})
export class FoodInfoShowerPopupwrapperComponent implements OnInit {

  food: Food;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FoodInfoShowerPopupwrapperComponentInput, public dialogRef: MatDialogRef<FoodInfoShowerPopupwrapperComponent>,
  ) {
    this.food = data.food;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }
}
