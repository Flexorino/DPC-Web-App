import { timestamp } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
export interface IEntryBSPicker {
    bs: BehaviorSubject<number>;
}