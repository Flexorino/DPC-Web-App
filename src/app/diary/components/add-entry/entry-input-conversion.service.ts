import { timestamp } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { EntryInputData } from './entry-input-data';
import { Entry } from 'src/shared/model/diary/entry/entry';
@Injectable()

export class EntryInputConversionService {

    // Annahme, dass die Werte korrekt sind, die hier geliefert werden
    convertToEntry(data: EntryInputData) {
        const date = new Date(data.date);
        date.setHours(Number.parseInt(data.time.split(':')[0]));
        date.setSeconds(Number.parseInt(data.time.split(':')[1]));
        let timestamp = date.getTime() / 1000;
        let entry = new Entry(timestamp);
        if (data.carbs) {
            entry.carbs = data.carbs;
        }
        if(data.bloodSugar){
            entry.bloodSuger = data.bloodSugar;
        }
        return entry;

    }

}