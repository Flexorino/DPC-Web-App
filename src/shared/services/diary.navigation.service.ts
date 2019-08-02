import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DiaryNavigationService {

    private currentDiaryId: string;

    public setCurrentDiary(id: string) {
        this.currentDiaryId = id;
    }

    public getId() {
        return this.currentDiaryId;
    }
}
