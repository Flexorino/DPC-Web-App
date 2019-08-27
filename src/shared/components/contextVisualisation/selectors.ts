import { Observable, combineLatest } from 'rxjs';
import { DiaryContext } from 'src/shared/model/diary/context/diary-context';
import { filter, map } from 'rxjs/operators';
import { Diary } from 'src/shared/model/diary/diary';
import { select, Store } from '@ngrx/store';


export const getLatestContextObservable: (x: Observable<Date>, y: Store<{ diary: Diary }>) => Observable<DiaryContext> = (timestamp: Observable<Date>, store: Store<{ diary: Diary }>) =>
    combineLatest(store.pipe(select("diary")).pipe(filter((x: Diary) => x.contexts? true : false)), timestamp).pipe(map((x: any) => {
        let diary: Diary = x[0];
        let currentTimeStamp: number = x[1];
        if (diary.contexts.length) {
            let filtered: DiaryContext[] = diary.contexts.filter(x => x.validFrom < currentTimeStamp);
            if (filtered.length) {
                return filtered.reduce((x, y) => x.validFrom > y.validFrom ? x : y);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }));