import { EntryAttribute } from './entry-attribute';

export class Entry {
    public constructor(public time: number, public attributes : Array<EntryAttribute> ){

    }
}