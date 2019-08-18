import { timestamp } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { EntryInputData } from './entry-input-data';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { TempBasalChangeAttribute } from 'src/shared/model/diary/entry/attributes/temp-basal-change-attribute';
import { SettingsService } from 'src/shared/services/settings.service';
import { InsulinAttribute } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
import { TagAttribute } from 'src/shared/model/diary/entry/attributes/tag-attribute';
@Injectable()

export class EntryInputConversionService {

    constructor(private settings: SettingsService) {

    }

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
        if (data.bloodSugar) {
            entry.bloodSuger = data.bloodSugar;
        }

        if (data.comment) {
            entry.comment = data.comment;
        }
        if (data.tempBasalChange) {
            const changeDuration: number =
                Number.parseInt(data.temBasalChangeDuration.split(':')[0]) * 3600 + Number.parseInt(data.temBasalChangeDuration.split(':')[1]) * 60;
            entry.tempBasalChange = new TempBasalChangeAttribute(changeDuration, data.tempBasalChange);
        }
        if (data.tags) {
            entry.tags = data.tags.map(x => new TagAttribute(x, null));
        }
        if (data.basal) {
            entry.basal = new InsulinAttribute(this.settings.defaultBasalInsulin, null, data.basal);
        }
        if (data.correctionBolus) {
            entry.correctionBolus = new InsulinAttribute(this.settings.defaultCorrectionInsulin, null, data.correctionBolus);
        }
        if (data.mealBolus) {
            entry.mealBolus = new InsulinAttribute(this.settings.defaultMealInsulin, null, data.mealBolus);
        }
        return entry;
    }
}