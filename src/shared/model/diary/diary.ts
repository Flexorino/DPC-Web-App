
import { Entry } from './entry/entry';
import { Drug } from './drug';
import { Insulin } from './insulin';
import { Tag } from './tag';
import { Food } from './food';
import { DiaryContext } from './context/diary-context';


export class Diary {

    public drugs: Array<Drug>;
    public insulins: Array<Insulin>;
    public tags: Array<Tag>;
    public food: Array<Food>;

    public name: string = "";

    public contexts: Array<DiaryContext>;

    public get latestContext() {
        return this.contexts ? this.contexts.reduce((x: DiaryContext, y: DiaryContext) => x.validFrom < y.validFrom ? y : x) : null;
    }

    constructor(public loadedEntries: Array<Entry>) { }
}
