import { Food } from 'src/shared/model/diary/food';
import { timestamp } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';

export interface IEntryFoodPickker {
    foodArray: BehaviorSubject<Array<FoodIntakeAttribute>>;
}