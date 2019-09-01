import { filter, finalize, take, map, tap, delay } from 'rxjs/operators';
import { ConstructionControlValue } from './construction-constrol-value';
import { ConstructionConstrol } from './construction-control';
import { combineLatest, Observable, merge, of } from 'rxjs';

export class FormUtil {

    static waitForInitialization(...controls: ConstructionConstrol<any>[]): Observable<void> {
        return combineLatest(controls.map(x => x.valueChanges)).pipe(
            filter((x: any[]) => x.map(x => x).reduce((x: boolean, z: boolean) => x && z)), delay(10), take(1), map(x => null));

    }

    static getImmediateObservable<T>(control: ConstructionConstrol<ConstructionControlValue<T>>): Observable<T> {
        return merge(of(control.value.constructed), control.valueChanges.pipe(map(x => x.constructed)));
    }

}