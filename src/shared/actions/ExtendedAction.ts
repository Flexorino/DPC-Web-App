import { DataAction } from './i-data-action';
import { SourceAction } from './i-source-actions';
import { CompletableAction } from './i-completable-action';

import { BaseSourceAction } from './base-source-action';
import { H } from '@angular/cdk/keycodes';
import { CancelableAction } from './i-cancelable-action';
export class ExtendedAction<T, R = void, D = any, C = void> extends BaseSourceAction<T> implements CompletableAction<R>, SourceAction<T>, DataAction<D>, CancelableAction<C>  {
    public cancel: (x: C) => void;
    public resolve: (x: R) => void;
    public reject: (x: Error) => void;
    public promise: Promise<R>;
    public readonly cancelPromise: Promise<C>;

    constructor(source: T, public readonly data?: D) {
        super(source);
        this.promise = new Promise((resolve, reject) => { this.resolve = resolve; this.reject = reject; });
        this.cancelPromise = new Promise((resolve) => { this.cancel = resolve; });
    }

    public then = <H>(funky: (x: R) => H): Promise<H> => {
        return this.promise.then(x => { console.log("fertig"); return x }).then(funky);
    }

    public catch = <H>(funky: (x: any) => H | R): Promise<H | R> => {
        return this.promise.catch(funky);
    }

    public finally = (funky: () => R): Promise<R> => {
        return this.promise.finally(funky);
    }
}
