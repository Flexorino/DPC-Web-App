import { filter, finalize, take, map, tap } from 'rxjs/operators';
import { ConstructionControlValue } from './construction-constrol-value';
import { ConstructionConstrol } from './construction-control';
import { combineLatest, Observable } from 'rxjs';

export class FormUtil {

    static waitForInitialization(...controls: ConstructionConstrol<any>[]): Observable<void> {
        return combineLatest(controls.map(x => x.valueChanges)).pipe( tap(x => console.log("HHEERREE")),
            filter((x: any[]) => x.map(x => x).reduce((x: boolean, z: boolean) => x && z)), take(1), map(x => null));

    }
}