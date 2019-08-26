import { BehaviorSubject } from 'rxjs';
import { InsulinAttribute } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
import { SimpleInsulinIntake } from 'src/shared/model/diary/entry/attributes/simple-Insulin-intake';
export interface IEntrySimpleInsulinIntakePicker {
    pickedIntake: BehaviorSubject<SimpleInsulinIntake>;
    setUnits(units: number);
}