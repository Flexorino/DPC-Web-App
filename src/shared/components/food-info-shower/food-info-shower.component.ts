import { Food } from './../../model/diary/food';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-food-info-shower',
  templateUrl: './food-info-shower.component.html',
  styleUrls: ['./food-info-shower.component.scss']
})
export class FoodInfoShowerComponent implements OnInit {


  @Input("food") food: Food;

  constructor() { }

  ngOnInit() {
  }

}
