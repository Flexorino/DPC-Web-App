import { Entry } from './../../model/diary/entry/entry';
import { InsulinAttribute } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
import { Observable } from 'rxjs';
export interface IBolusUtilDao {
    getBolusSuggestion(entry: Entry) : Observable<BolusSuggestionAnswer>;
}

export class BolusSuggestionAnswer {
    constructor(public readonly insulinIntakes: InsulinAttribute[], public fastKE?: number) { }
}