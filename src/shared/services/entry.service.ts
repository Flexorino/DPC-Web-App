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
        const newEntry: Entry = new Entry(webEntry.id);
        newEntry.timeStamp = new Date(webEntry.timeStamp * 1000);
        if (webEntry.bloodSugar) {
            newEntry.bloodSuger = webEntry.bloodSugar;
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
        webEntry.timeStamp = Math.round(entry.timeStamp.getTime() / 1000);
        if (entry.bloodSuger) {
            webEntry.bloodSugar = entry.bloodSuger;
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
