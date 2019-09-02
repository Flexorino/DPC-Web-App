import { FoodIntakeAttribute } from './attributes/food-intake-attribute';

import { EntryAttribute } from './entry-attribute';
import { InsulinAttribute } from './attributes/insulin-attribute';
import { TempBasalChangeAttribute } from './attributes/temp-basal-change-attribute';
import { Tag } from '../tag';
import { TagAttribute } from './attributes/tag-attribute';

export class Entry {

    // attributes
    public bloodSuger?: number;
    public carbs?: number;
    public insulinIntakes?: InsulinAttribute[];
    public tempBasalChange?: TempBasalChangeAttribute;
    public tags?: Array<TagAttribute> =[];
    public comment?: string;
    public timeStamp: Date;
    public foodIntakes: FoodIntakeAttribute[] = [];

    //TODO: ändere mich um!
    public mealBolus?: InsulinAttribute;
    public correctionBolus?: InsulinAttribute;
    public basal?: InsulinAttribute;

    public constructor(public readonly id) {

    }
}
