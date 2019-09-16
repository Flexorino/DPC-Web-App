import { BaseInsulinIntakeSemantics } from './../model/diary/entry/attributes/insulin-attribute';
import { SimpleInsulinIntake } from './../model/diary/entry/attributes/simple-Insulin-intake';
import { TimeStampInsulinIntake } from './../../web-api/model/timeStampInsulinIntake';
import { Absorption } from './../model/diary/food';
import { FoodDescr } from './../../web-api/model/foodDescr';
import { FoodIntakeAttribute } from './../model/diary/entry/attributes/food-intake-attribute';
import { FoodIntake } from './../../web-api/model/foodIntake';
import { EntryReprMealBolus } from './../../web-api/model/entryReprMealBolus';
import { EntryRepr } from './../../web-api/model/entryRepr';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { BaseEntryAttribute } from './../model/diary/entry/base-entry-attribute';
import { EntryAttribute } from './../model/diary/entry/entry-attribute';
import { InlineResponse2002 } from './../../web-api/model/inlineResponse2002';
import { map, timestamp } from 'rxjs/operators';
import { EintrgeService } from './../../web-api/api/eintrge.service';
import { Observable } from 'rxjs';
import { EntryReprResponse } from 'src/web-api';
import { EntryAttributeTypes } from '../model/diary/entry/entry-attribute-types';
import { Injectable } from '@angular/core';
import * as d3 from "d3";
import { InsulinAttribute } from '../model/diary/entry/attributes/insulin-attribute';
import { TempBasalChangeAttribute } from '../model/diary/entry/attributes/temp-basal-change-attribute';
import { TagAttribute } from '../model/diary/entry/attributes/tag-attribute';
import { DiaryNavigationService } from './diary.navigation.service';
import { Food } from '../model/diary/food';
@Injectable({ providedIn: "root" })
export class EntryService {


    constructor(private webEntryervice: EintrgeService, private currentDiaryService: DiaryNavigationService) {

    }

    public getEntries(id: string): Observable<Array<Entry>> {
        return this.webEntryervice.getDiaryEntries(this.currentDiaryService.currentDiaryId$.getValue()).pipe(
            map((x: InlineResponse2002) => {
                let entries: Array<Entry> = [];
                x.entries.forEach((y: EntryReprResponse) => {
                    entries.push(this.convertNetworkEntryToInternalEntry(y));
                });
                return entries;
            })
        );
    }

    public addEntry(id: string, entry: Entry): Observable<Entry> {
        return this.webEntryervice.addDiaryEntry(this.currentDiaryService.currentDiaryId$.getValue(),
            this.convertInternatlEntryToNEtworkEntry(entry)).pipe(map(
                x => {
                    return this.convertNetworkEntryToInternalEntry(x);
                }));
    }


    private convertAttributesToList(obj: EntryReprResponse): Array<EntryAttribute> {
        let list: Array<EntryAttribute> = [];

        if (obj.bloodSugar) {
            list.push(new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, obj.bloodSugar));
        }
        return list;

    }

    public mapEntriesToDays(entries: Array<Entry>): Array<{ day: Date, entries: Array<Entry> }> {
        let map: Array<{ day: number, entries: Array<Entry> }> = [];
        let curMap = d3.nest().key(function (d: Entry) {
            return Number.parseInt(((d.timeStamp.getTime() / 1000) / 86400).toFixed(0)) * 86400;
        }).entries(entries).map((x) => { return { day: new Date(x.key * 1000), entries: x.values }; }).sort((a, b) => b.day - a.day);
        return curMap;
    }

    private convertNetworkEntryToInternalEntry(webEntry: EntryReprResponse): Entry {
        const newEntry: Entry = new Entry(webEntry.id);
        newEntry.timeStamp = new Date(webEntry.timeStamp * 1000);
        if (webEntry.bloodSugar) {
            newEntry.bloodSuger = webEntry.bloodSugar;
        }

        if (webEntry.insulinIntakes && webEntry.insulinIntakes.length) {
            newEntry.insulinIntakes = [];
            webEntry.insulinIntakes.forEach(x => {
                let query: any = x;
                if (query.endTimeStamp) {

                } else {
                    let intake: TimeStampInsulinIntake = x;
                    let simpleInsulinIntake = new SimpleInsulinIntake();
                    if (intake.semanticIdentefier) {
                        simpleInsulinIntake.semanticIdentifier = intake.semanticIdentefier == "mealBolus" ? BaseInsulinIntakeSemantics.FOOD_BOLUS : intake.semanticIdentefier == "correctionsBolus" ? BaseInsulinIntakeSemantics.CORRECTION_BOLUS : BaseInsulinIntakeSemantics.BASAL;
                    }
                    simpleInsulinIntake.units = intake.amount;
                    newEntry.insulinIntakes.push(simpleInsulinIntake);

                }
            });
        }

        if (webEntry.foodIntakes) {
            newEntry.foodIntakes = [];
            webEntry.foodIntakes.forEach(x => {
                let foodIntake = new FoodIntakeAttribute();
                foodIntake.amount = x.amount;
                if (x.food) {
                    let webFood: FoodDescr = x.food as FoodDescr;
                    let food = new Food(webEntry.id);
                    if (webFood.resorption) {
                        food.absorption = webFood.resorption == "fast" ? Absorption.FAST : webFood.resorption == "medium" ? Absorption.MEDIUM : Absorption.SLOW;
                    }
                    food.description = webFood.comment;
                    food.carbsFactor = webFood.carbsFactor;
                    food.name = webFood.name;
                    foodIntake.food = food;
                }
                newEntry.foodIntakes.push(foodIntake);
            });
        }

        if (webEntry.tempBasalChange) {
            newEntry.tempBasalChange = new TempBasalChangeAttribute(webEntry.tempBasalChange.duration, webEntry.tempBasalChange.percentage);
        }
        if (webEntry.tags) {
            newEntry.tags = newEntry.tags.map(x => new TagAttribute(x.tagId, x.name));
        }
        return newEntry;
    }

    private convertInternatlEntryToNEtworkEntry(entry: Entry): EntryReprResponse {
        const webEntry: EntryReprResponse = { timeStamp: 0 };
        webEntry.timeStamp = Math.round(entry.timeStamp.getTime() / 1000);;
        if (entry.bloodSuger) {
            webEntry.bloodSugar = entry.bloodSuger;
        }

        if (entry.foodIntakes) {
            let intakes = [];
            entry.foodIntakes.forEach(x => {
                let intake: FoodIntake = { amount: x.amount };
                if (x.food) {
                    if (x.food.id) {
                        intake.food = x.food.id;
                    } else {
                        let descr: FoodDescr = {};
                        descr.carbsFactor = x.food.carbsFactor;
                        descr.comment = x.food.description;
                        descr.name = x.food.name;
                        if (x.food.absorption) {
                            descr.resorption = x.food.absorption === Absorption.FAST ? "fast" : x.food.absorption === Absorption.MEDIUM ? "medium" : "slow";
                        }
                        intake.food = descr;
                    }
                }
                intakes.push(intake);
            })

            webEntry.foodIntakes = intakes;

        }

        if (entry.comment) {
            webEntry.comment = entry.comment;
        }

        if (entry.tempBasalChange) {
            webEntry.tempBasalChange = {};
            webEntry.tempBasalChange.duration = entry.tempBasalChange.duration;
            webEntry.tempBasalChange.percentage = entry.tempBasalChange.factor;
        }

        return webEntry;
    }
}
