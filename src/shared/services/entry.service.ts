import { BaseEntryAttribute } from './../model/diary/entry/base-entry-attribute';
import { EntryAttribute } from './../model/diary/entry/entry-attribute';
import { InlineResponse2002 } from './../../web-api/model/inlineResponse2002';
import { map } from 'rxjs/operators';
import { EintrgeService } from './../../web-api/api/eintrge.service';
import { Observable } from 'rxjs';
import { Entry } from '../model/diary/entry/entry';
import { EntryReprResponse } from 'src/web-api';
import { EntryAttributeTypes } from '../model/diary/entry/entry-attribute-types';
import { Injectable } from '@angular/core';
import * as d3 from "d3";
@Injectable({ providedIn: "root" })
export class EntryService {


    constructor(private webEntryervice: EintrgeService) {

    }

    public getEntries(id: string): Observable<Array<Entry>> {
        return this.webEntryervice.getDiaryEntries(id).pipe(
            map((x: InlineResponse2002) => {
                let entries: Array<Entry> = [];
                x.entries.forEach((y: EntryReprResponse) => {

                    entries.push(new Entry(y.timestamp, this.convertAttributesToList(y)));
                });
                return entries;
            })
        );
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
            return Number.parseInt((d.time / 86400).toFixed(0)) * 86400;
        }).entries(entries).map((x) => {return{ day: x.key, entries: x.values };}).sort((a,b)=> a.day -b.day);
        return curMap;
    }  
} 