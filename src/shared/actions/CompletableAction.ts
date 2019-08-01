import { BasicActionProps } from './basic-action-props';
import { H } from '@angular/cdk/keycodes';
export class CompletableAction<T, R> extends BasicActionProps<T>  {
    public resolve: (x: R) => void;
    public reject: (x: Error) => void;
    private promise: Promise<R>;
    constructor(source: T, ) {
        super(source);
        this.promise = new Promise((resolve, reject) => { this.resolve = resolve; this.reject = reject; });
    }

    public then = <H>(funky: (x: R) => H): Promise<H> => {
        return this.promise.then(funky);
    }

    public catch = <H>(funky: (x: any) => H | R): Promise<H | R> => {
        return this.promise.catch(funky);
    }

    public finally = (funky: () => R): Promise<R> => {
        return this.promise.finally(funky);
    }
}
