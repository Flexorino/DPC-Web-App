import { SourceAction } from './i-source-actions';
export class BaseSourceAction<T> implements SourceAction<T> {
    constructor(public readonly source: T) { }
}