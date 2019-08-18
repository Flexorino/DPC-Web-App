import { Entry } from './entry/entry';
import { Drug } from './drug';
import { Insulin } from './insulin';
import { Tag } from './tag';
import { Food } from './food';

export class Diary {

    public drugs: Array<Drug>;
    public insulins: Array<Insulin>;
    public tags: Array<Tag>;
    public food: Array<Food>;

    public name: string;

    constructor(public loadedEntries: Array<Entry>) {}
}
