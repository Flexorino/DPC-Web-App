import { Store } from '@ngrx/store';
import { delay, map } from 'rxjs/operators';
import { BaseInsulinIntakeSemantics } from './../../model/diary/entry/attributes/insulin-attribute';
import { Entry } from './../../model/diary/entry/entry';
import { IBolusUtilDao, BolusSuggestionAnswer } from './i-bolus-util-dao';
import { Observable, of, Subject } from 'rxjs';
import { SimpleInsulinIntake } from 'src/shared/model/diary/entry/attributes/simple-Insulin-intake';
import { Injectable } from '@angular/core';
import { Diary } from 'src/shared/model/diary/diary';
import { getLatestContextObservable } from 'src/shared/components/contextVisualisation/selectors';
import { DiaryContext } from 'src/shared/model/diary/context/diary-context';

@Injectable()
export class RestNetworkBolusUtilDAO implements IBolusUtilDao {


    constructor(private store: Store<{ diary: Diary }>) {

    }

    getBolusSuggestion(entry: Entry): Observable<BolusSuggestionAnswer> {
        return getLatestContextObservable(of(entry.timeStamp), this.store).pipe(
            map(x => {
                let intakes = [];
                let simpleIntake = new SimpleInsulinIntake();
                simpleIntake.semanticIdentifier = BaseInsulinIntakeSemantics.FOOD_BOLUS;
                simpleIntake.units = entry.foodIntakes.length ? entry.foodIntakes.map(x => x.amount).reduce((x, y) => x + y) : 0;
                intakes.push(simpleIntake);
                return new BolusSuggestionAnswer(intakes);
            }));
    }

}