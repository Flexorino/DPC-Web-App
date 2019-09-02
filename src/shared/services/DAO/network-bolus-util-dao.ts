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
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable()
export class RestNetworkBolusUtilDAO implements IBolusUtilDao {


    constructor(private store: Store<{ diary: Diary }>) {

    }

    getBolusSuggestion(entry: Entry): Observable<BolusSuggestionAnswer> {
        return getLatestContextObservable(of(entry.timeStamp), this.store).pipe(
            map(x => {
                if (!x) {
                    throw new Error("kein Kontext gefunden (sollte spätert nicht mehr vorkommen)");
                }
                if (!x.keFactor || !x.frameValue || !x.correctionFactors) {
                    throw new Error("momentan nur Bolus-Berechnung unterstützt, wenn Rahmenwerte, Korrekturfaktoren und KE_Faktoren angegeben sind!");
                }
                let intakes = [];
                if (entry.foodIntakes.length) {
                    let simpleIntake = new SimpleInsulinIntake();
                    simpleIntake.semanticIdentifier = BaseInsulinIntakeSemantics.FOOD_BOLUS;
                    let takeCarbs = entry.foodIntakes.length ? entry.foodIntakes.map(x => x.amount).reduce((x, y) => x + y) : 0;
                    let hour = entry.timeStamp.getHours();
                    let strzing = entry.timeStamp.toISOString();
                    let utc = entry.timeStamp.toLocaleDateString();
                    let time = entry.timeStamp.toLocaleTimeString();
                    let factor = x.keFactor.dialyKeFactors[hour];
                    simpleIntake.units = factor * takeCarbs;
                    intakes.push(simpleIntake);
                }
                let fastKE = undefined;
                if (entry.bloodSuger) {
                    let diff = entry.bloodSuger - x.frameValue.dailyBSGoalValues[entry.timeStamp.getHours()];
                    if (diff > 0) {
                        let hour = entry.timeStamp.getHours();
                        let corrFactor = x.correctionFactors.dialyCorrectionFactors[hour];
                        let ie = diff / corrFactor;
                        let simpleIntake = new SimpleInsulinIntake();
                        simpleIntake.semanticIdentifier = BaseInsulinIntakeSemantics.CORRECTION_BOLUS;
                        simpleIntake.units = ie;
                        intakes.push(simpleIntake);
                    }
                    if (diff < 0) {
                        diff = -diff;
                        let hour = entry.timeStamp.getHours();
                        let corrFactor = x.correctionFactors.dialyCorrectionFactors[hour];
                        let ie = diff / corrFactor;
                        let kef = x.keFactor.dialyKeFactors[hour];
                        let ke = ie / kef;
                        fastKE = ke;
                    }
                }
                return new BolusSuggestionAnswer(intakes, fastKE);
            }), delay(500));
    }

}