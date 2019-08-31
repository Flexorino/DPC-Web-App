import { Tag } from './../model/diary/tag';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
export class ConstructionConstrol<T> extends FormControl {
    get value(): T {
        return super.value;
    }

    set value(t: T) {
        // @ts-ignore
        super.value = t;
    }

    setVlaue(val: T) {
        super.setValue(val);
    }

    get  valueChanges() : Observable<T> {
        return super.valueChanges;
    };

    set valueChanges(t : Observable<T>) {
        // @ts-ignore
        super.valueChanges = t;
    }


}