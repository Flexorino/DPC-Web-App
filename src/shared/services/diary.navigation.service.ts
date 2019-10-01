import { Configuration } from './../../web-api/configuration';
import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { SessionService } from './session-service';

@Injectable({ providedIn: 'root' })
export class DiaryNavigationService {

    public currentDiaryId$: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(apiConfig: Configuration, private sessionService: SessionService) {
        this.currentDiaryId$.subscribe(x => console.log("diary Changed"));
        sessionService.sessionData$.subscribe(x => {
            if (!x) {
                this.currentDiaryId$.next(null);
            } else {
                this.currentDiaryId$.next(x.lastDiary);
            }
        });
    }

    public setCurrentDiary(id: string) {
        this.currentDiaryId$.next(id);
    }

}
