import { timestamp } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
export interface IEntryTimestampPicker {
    timestamp: BehaviorSubject<number>;
}