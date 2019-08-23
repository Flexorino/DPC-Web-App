import { Component, OnInit, Input } from '@angular/core';
import { IEntryFoodIntakeListPicker } from '../../inputs/interfaces/IEntryFoodIntakeListPicker';

@Component({
  selector: 'app-food-intake-summation',
  templateUrl: './food-intake-summation.component.html',
  styleUrls: ['./food-intake-summation.component.scss']
})
export class FoodIntakeSummationComponent implements OnInit {

  @Input("foodIntakes") foodIntakes : IEntryFoodIntakeListPicker;

  constructor() { }

  ngOnInit() {
  }

}
