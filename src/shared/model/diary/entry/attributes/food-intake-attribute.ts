import { Food } from 'src/shared/model/diary/food';
export class FoodIntakeAttribute {
    // from db or 'anonym'
    public food : Food;
    // in carbs!
    public amount: number;
}