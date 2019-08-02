
import { EntryAttribute } from './entry-attribute';
import { InsulinAttribute } from './attributes/insulin-attribute';
import { TempBasalChangeAttribute } from './attributes/temp-basal-change-attribute';
import { Tag } from '../tag';
import { TagAttribute } from './attributes/tag-attribute';

export class Entry {

    // attributes
    public bloodSuger?: number;
    public carbs?: number;
    public mealBolus?: InsulinAttribute;
    public correctionBolus?: InsulinAttribute;
    public basal?: InsulinAttribute;
    public tempBasalChange?: TempBasalChangeAttribute;
    public tags?: Array<TagAttribute> =[];
    public comment?: string;

    // ref
    public _selfId: string;

    public constructor(public timeStamp: number) {

    }
}
