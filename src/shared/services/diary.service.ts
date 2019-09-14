import { InsulinEffect } from './../model/diary/insulin';
import { Food, Absorption } from './../model/diary/food';
import { Drug } from './../model/diary/drug';
import { InlineResponse2001 } from './../../web-api/model/inlineResponse2001';
import { map, delay } from 'rxjs/operators';
import { DiariesService } from './../../web-api/api/diaries.service';
import { Injectable } from '@angular/core';
import { Diary } from '../model/diary/diary';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Insulin } from '../model/diary/insulin';

@Injectable({ providedIn: 'root' })
export class DiaryService {

    constructor(private networkService: DiariesService, private store: Store<any>) {

    }

    public getDrugs(diaryId: string) {
        return this.networkService.getDiaryDrugs(diaryId).pipe(map((z: InlineResponse2001) => z.drugs.map(z => new Drug(z.id, z.name, ""))));
    }

    public getDiaryInformation(diaryId: string): Observable<Diary> {

        return this.networkService.getDiary2(diaryId).pipe(map(
            x => {
                const diary = new Diary([]);
                diary.name = x.name;
                return diary;
            }
        ));
    }

    public getFood(diaryId: string): Observable<Array<Food>> {

        let fakeDate : Array<Food> = [{id: "asdasds", name: "Pizza", absorption:Absorption.MEDIUM, carbsFactor: 0.5, description:"asdad"},
        {id: "asdasds2", name: "Pasta", absorption:Absorption.MEDIUM, carbsFactor: 0.5, description:"asdad"}]

        return of(fakeDate).pipe(delay(2000));
    }

    public getInsulins(diaryId: string): Observable<Array<Insulin>> {

        let fakeDate : Array<Insulin> = [{id: "asdasddds", name: "Insulin 1", insulinEffect:InsulinEffect.MEDIUM, description:"asdad"},
        {id: "asdasddds2", name: "Insulin 2", insulinEffect:InsulinEffect.FAST, description:"asdad"}]

        return of(fakeDate).pipe(delay(2000));
    }
}
