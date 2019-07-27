import { EntryAttributeTypes } from './entry-attribute-types';

export interface EntryAttribute {
    
    readonly type: EntryAttributeTypes;
    readonly mainValue: any;
}