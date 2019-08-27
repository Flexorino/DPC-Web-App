import { InsulinAttribute } from './insulin-attribute';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class IntervallInsulinIntake extends InsulinAttribute {
    public endTimeStamp : Date;
}