import { Drug } from './../model/diary/drug';
import { InlineResponse2001 } from './../../web-api/model/inlineResponse2001';
import { map } from 'rxjs/operators';
import { DiariesService } from './../../web-api/api/diaries.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DiaryService {

    constructor(private networkService: DiariesService) {

    }

    public getDrugs(diaryId: string) {
        return this.networkService.getDiaryDrugs(diaryId).pipe(map((z: InlineResponse2001) => z.drugs.map(z => new Drug(z.id, z.name, ""))));
    }
}
