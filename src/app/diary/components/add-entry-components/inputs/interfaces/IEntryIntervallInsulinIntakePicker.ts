import { IntervallInsulinIntake } from 'src/shared/model/diary/entry/attributes/intervall-insulin-intake';
import { BehaviorSubject } from 'rxjs';

export class IEntryIntervallInsulinIntakePicker {
    pickedIntake: BehaviorSubject<IntervallInsulinIntake>;
}