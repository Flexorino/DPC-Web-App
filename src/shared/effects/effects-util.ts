
import { Action, ActionCreator } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, OperatorFunction } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TypedAction } from '@ngrx/store/src/models';

export class Doable<T> {
    public do: (handler: (x: T) => Observable<Action>) => Observable<Action>;
}

@Injectable({ providedIn: "root" })
export class EffectsUtil {
    constructor(
        private actions$: Actions
    ) { }

    public  when<T extends object>(action: ActionCreator<any ,(props: T) => T & TypedAction<string>>): Doable<T> {
        let filter: OperatorFunction<Action, any> = ofType(action);
        let doable : Doable<T> = {
            do: (handler: (action: T) => Observable<Action>) => {
                let listener$ = createEffect(() => this.actions$.pipe(filter,
                    mergeMap(x => handler(x))
                ));
                return listener$;
            }
        };
        return doable;
    }
}