import { Configuration } from './../../web-api/configuration';
import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiaryNavigationService {

    public currentDiaryId$: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(apiConfig: Configuration) {
        if (localStorage.getItem('currentDiary')) {
            this.currentDiaryId$.next(localStorage.getItem('currentDiary'));
        }
    }

    public setCurrentDiary(id: string) {
        localStorage.setItem('currentDiary', id);
        this.currentDiaryId$.next(id);
    }

}
