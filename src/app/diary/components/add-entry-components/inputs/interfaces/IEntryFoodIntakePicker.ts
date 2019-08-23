import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';
import { timestamp } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
export interface IEntryFoodIntakePicker {
    foodIntake: BehaviorSubject<FoodIntakeAttribute>;
}