import { FormGroup } from '@angular/forms';

import { filter, map, merge, retry, } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Inject, OnDestroy, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diary } from 'src/shared/model/diary/diary';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
import { IEntryFoodPicker } from 'src/shared/components/interfaces/IEntryFoodPicker';
import { MatTabChangeEvent } from '@angular/material/tabs';


enum PickMode {
  DB, CUSTOM
}

export class AddEntryFoodSelectionDeciderInput {
  constructor(public readonly food: Food, public readonly: FormGroup) { }
}

@Component({
  selector: 'add-entry-food-selection-decider',
  templateUrl: './add-entry-food-selection-decider.component.html',
  styleUrls: ['./add-entry-food-selection-decider.component.scss']
})


export class AddEntryFoodSelectionDecider implements OnInit, OnDestroy, IEntryFoodPicker, AfterViewInit {

  food: BehaviorSubject<Food> = new BehaviorSubject(null);

  private mode: PickMode = PickMode.DB;
  private preselectedDBFood: Food = null;
  private preselectedCustoMFood: Food = null;
  selectedTabIndex: number;
  customFoodFormGroup: FormGroup = new FormGroup({});

  @ViewChild('listFoodPicker', { static: false }) listFoodPicker: IEntryFoodPicker;
  @ViewChild('customFoodPicker', { static: false }) customFoodPicker: IEntryFoodPicker;

  get isValid(): boolean {
    if (!this.listFoodPicker) {
      return false;
    }
    return this.mode === PickMode.DB ? this.listFoodPicker.food.getValue() ? true : false : this.customFoodFormGroup.valid;
  }

  constructor(
    public dialogRef: MatDialogRef<AddEntryFoodSelectionDeciderInput>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AddEntryFoodSelectionDeciderInput,
    private store: Store<{ diary: Diary }>
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.data.food && !this.data.food.id) {
        this.preselectedCustoMFood = this.data.food
        this.mode = PickMode.CUSTOM;
        this.selectedTabIndex = 1;
      } else if (this.data.food && this.data.food.id) {
        this.preselectedDBFood = this.data.food;
      }
    });
  }
  onNoClick() {
    this.dialogRef.close();
    this.food.complete();
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    this.dialogRef.close();
    if (this.mode === PickMode.DB) {
      this.food.next(this.listFoodPicker.food.getValue());
    } else {
      this.food.next(this.customFoodPicker.food.getValue());
    }
    this.food.complete();
  }

  ngAfterViewInit(): void {
  }

  tabClick(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.mode = PickMode.DB;
    } else {
      this.mode = PickMode.CUSTOM;
    }
  }
}
