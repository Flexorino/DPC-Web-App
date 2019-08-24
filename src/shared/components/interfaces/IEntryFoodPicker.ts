import { BehaviorSubject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
export interface IEntryFoodPicker {
    food: BehaviorSubject<Food>;
}