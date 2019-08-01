import { BasicActionProps } from './basic-action-props';
export class CancelableAction<T, R> extends BasicActionProps<T> {

    public readonly cancelPromise: Promise<R>;
    public cancel: (x: R) => void;
    constructor(source: T) {
        super(source);
        this.cancelPromise = new Promise((resolve) => { this.cancel = resolve; });
    }
}