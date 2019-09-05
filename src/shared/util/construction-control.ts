import { Tag } from './../model/diary/tag';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
export class ConstructionConstrol<T> extends FormControl {
    get value(): T {
        // @ts-ignore
        return super.value;
    }

    set value(t: T) {
        // @ts-ignore
        super.value = t;
    }

    setVlaue(val: T) {
        // @ts-ignore
        super.setValue(val);
    }

    get  valueChanges() : Observable<T> {
        // @ts-ignore
        return super.valueChanges;
    };

    set valueChanges(t : Observable<T>) {
        // @ts-ignore
        super.valueChanges = t;
    }


}