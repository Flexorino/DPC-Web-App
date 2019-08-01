import { BasicActionProps } from './basic-action-props';
export class CompletableAction<T, R> extends BasicActionProps<T> {
    constructor(source: T, public readonly  resolve: (x: R) => void, public readonly  reject: (x: Error) => void) {
        super(source);
    }
}
