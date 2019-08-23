import { SettingsService } from 'src/shared/services/settings.service';
import { FoodIntakeAttribute } from './../../../../../../shared/model/diary/entry/attributes/food-intake-attribute';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IEntryFoodIntakeListPicker } from '../../inputs/interfaces/IEntryFoodIntakeListPicker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-food-intake-summation',
  templateUrl: './food-intake-summation.component.html',
  styleUrls: ['./food-intake-summation.component.scss']
})
export class FoodIntakeSummationComponent implements OnInit, AfterViewInit {

  @Input("foodIntakes") foodIntakes: IEntryFoodIntakeListPicker;

  sum: Observable<number>;

  constructor(private settings: SettingsService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.sum = this.foodIntakes.foodArray.pipe(map((x: FoodIntakeAttribute[]) => x.map(x => x.amount ? x.amount * this.settings.carbsFactorSubj.getValue() : 0).reduce((x, y) => x + y)));
  }

}
