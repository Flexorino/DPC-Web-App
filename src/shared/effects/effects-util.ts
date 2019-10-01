import { ExtendedAction } from './../actions/ExtendedAction';

import { Action, ActionCreator } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, OperatorFunction, forkJoin, EMPTY, from, Subject } from 'rxjs';
import { mergeMap, map, flatMap, tap, catchError, takeUntil, race } from 'rxjs/operators';
import { TypedAction } from '@ngrx/store/src/models';
import { T } from '@angular/cdk/keycodes';

export class Doable<T> {
    public do: (...handler: ((x: T) => Observable<Action>)[]) => Observable<Action>;
}

@Injectable({ providedIn: "root" })
export class EffectsUtil {
    constructor(
        private actions$: Actions
    ) { }

    public when<T extends ExtendedAction<any>>(action: ActionCreator<any, (props: T) => T & TypedAction<string>>): Doable<T> {
        let filter: OperatorFunction<Action, any> = ofType(action);
        let a: T;
        let cancel: Subject<any> = new Subject();
        let doable: Doable<T> = {
            do: (...handler: ((action: T) => Observable<Action>)[]) => {
                let listener$ = createEffect(() => this.actions$.pipe(filter,
                    tap(x => { a = x; a.cancelPromise.then(x => cancel.next(EMPTY)); }),
                    mergeMap(x => forkJoin(handler.map(z => z(x)))), mergeMap((x: any[]) => new Observable<any>(sub => {
                        x.forEach(x => sub.next(x));
                        sub.complete();
                    })),
                    tap(x => a.resolve(null)),
                    catchError(err => { a.reject(err); return EMPTY; }),
                ));
                return listener$;
            }
        };
        return doable;
    }
}