import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { DiaryViews } from './DiaryViews';

@Injectable()
export class CurrentDiaryViewSerivce {

    public currentView : BehaviorSubject<DiaryViews> = new BehaviorSubject(null);

    public setCurrentView(view : DiaryViews){
        this.currentView.next(view);
    }

}


