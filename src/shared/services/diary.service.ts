import { Drug } from './../model/diary/drug';
import { InlineResponse2001 } from './../../web-api/model/inlineResponse2001';
import { map } from 'rxjs/operators';
import { DiariesService } from './../../web-api/api/diaries.service';
import { Injectable } from '@angular/core';
import { Diary } from '../model/diary/diary';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class DiaryService {

    constructor(private networkService: DiariesService, private store: Store<any>) {

    }

    public getDrugs(diaryId: string) {
        return this.networkService.getDiaryDrugs(diaryId).pipe(map((z: InlineResponse2001) => z.drugs.map(z => new Drug(z.id, z.name, ""))));
    }

    public getDiaryInformation(diaryId: string): Observable<Diary> {

        return this.networkService.getDiary(diaryId).pipe(map(
            x => {
                const diary = new Diary([]);
                diary.name = x.name;
                return diary;
            }
        ));
    }
}
