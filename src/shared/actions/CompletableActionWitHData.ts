import { CompletableAction } from 'src/shared/actions/CompletableAction';


export class CompletableActionWithData<T, R, Z> extends CompletableAction<T, R>  {
    constructor(source: T, public data: Z) {
        super(source);
    }
}