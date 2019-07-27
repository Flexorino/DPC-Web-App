import { EntryAttributeTypes } from './entry-attribute-types';
import { EntryAttribute } from './entry-attribute';
export class BaseEntryAttribute implements EntryAttribute {

    constructor(public readonly type: EntryAttributeTypes, public readonly mainValue: any) { }

}