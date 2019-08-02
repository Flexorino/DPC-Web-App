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
import { EntryInputData } from 'src/app/diary/components/add-entry/entry-input-data';
import { InsulinAttribute } from '../model/diary/entry/attributes/insulin-attribute';
import { TempBasalChangeAttribute } from '../model/diary/entry/attributes/temp-basal-change-attribute';
import { TagAttribute } from '../model/diary/entry/attributes/tag-attribute';
import { DiaryNavigationService } from './diary.navigation.service';
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

    public mapEntriesToDays(entries: Array<Entry>): Array<{ day: number, entries: Array<Entry> }> {
        let map: Array<{ day: number, entries: Array<Entry> }> = [];
        let curMap = d3.nest().key(function (d) {
            return Number.parseInt((d.timeStamp / 86400).toFixed(0)) * 86400;
        }).entries(entries).map((x) => { return { day: x.key, entries: x.values }; }).sort((a, b) => a.day - b.day);
        return curMap;
    }

    private convertNetworkEntryToInternalEntry(webEntry: EntryReprResponse): Entry {
        const newEntry: Entry = new Entry(webEntry.timestamp);
        newEntry._selfId = webEntry.selfID;
        if (webEntry.bloodSugar) {
            newEntry.bloodSuger = webEntry.bloodSugar;
        }
        if (webEntry.mealUnits) {
            newEntry.carbs = webEntry.mealUnits;
        }
        if (webEntry.basal) {
            newEntry.basal = new InsulinAttribute(webEntry.basal.insulin, webEntry.basal.insulinName, webEntry.basal.units);
        }
        if (webEntry.comment) {
            newEntry.comment = webEntry.comment;
        }
        if (webEntry.correctionBolus) {
            newEntry.correctionBolus = new InsulinAttribute(webEntry.correctionBolus.insulin, webEntry.correctionBolus.insulinName,
                webEntry.correctionBolus.units);
        }
        if (webEntry.mealBolus) {
            newEntry.mealBolus = new InsulinAttribute(webEntry.mealBolus.insulin, webEntry.mealBolus.insulinName,
                webEntry.mealBolus.units);
        }
        if (webEntry.tempBasalChange) {
            newEntry.tempBasalChange = new TempBasalChangeAttribute(webEntry.tempBasalChange.duration, webEntry.tempBasalChange.percentage);
        }
        if (webEntry.tags) {
            newEntry.tags = newEntry.tags.map(x => new TagAttribute(x.tagId, x.name));
        }
        return newEntry;
    }

    private convertInternatlEntryToNEtworkEntry(entry: Entry): EntryRepr {
        const webEntry: EntryRepr = { timeStamp: 0 };
        webEntry.timeStamp = entry.timeStamp;
        if (entry.bloodSuger) {
            webEntry.bloodSugar = entry.bloodSuger;
        }
        if (entry.carbs) {
            webEntry.mealUnits = entry.carbs;
        }
        if (entry.basal) {
            webEntry.basal = {};
            webEntry.basal.insulin = entry.basal.insulinId;
            webEntry.basal.units = entry.basal.units;
        }
        if (entry.comment) {
            webEntry.comment = entry.comment;
        }
        if (entry.correctionBolus) {
            webEntry.correctionBolus = {};
            webEntry.correctionBolus.insulin = entry.correctionBolus.insulinId;
            webEntry.correctionBolus.units = entry.correctionBolus.units;
        }
        if (entry.mealBolus) {
            webEntry.mealBolus = {};
            webEntry.mealBolus.insulin = entry.mealBolus.insulinId;
            webEntry.mealBolus.units = entry.mealBolus.units;
        }
        if (entry.tempBasalChange) {
            webEntry.tempBasalChange = {};
            webEntry.tempBasalChange.duration = entry.tempBasalChange.duration;
            webEntry.tempBasalChange.percentage = entry.tempBasalChange.factor;
        }
        if (entry.tags) {
            webEntry.tags = entry.tags.map(x => x.tagId);
        }
        return webEntry;
    }
}
