import { Entry } from './entry/entry';
import { Drug } from './drug';
import { Insulin } from './insulin';
import { Tag } from './tag';

export class Diary {

    public drugs: Array<Drug>;
    public insulins: Array<Insulin>;
    public tags: Array<Tag>;

    public name: string;

    constructor(public loadedEntries: Array<Entry>) {}
}
