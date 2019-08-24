import { BehaviorSubject } from 'rxjs';
import { Food } from 'src/shared/model/diary/food';
export class IListFoodPicker {
    selectedFood : BehaviorSubject<Food>;
}