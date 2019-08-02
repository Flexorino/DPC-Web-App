import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiaryNavigationService {

    public currentDiaryId$: Subject<string> = new Subject();

    constructor() {
        this.currentDiaryId$.next("test");
    }

    public setCurrentDiary(id: string) {
        this.currentDiaryId$.next(id);
    }

}
