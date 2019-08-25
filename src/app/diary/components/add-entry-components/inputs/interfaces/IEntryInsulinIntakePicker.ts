import { BehaviorSubject } from 'rxjs';
import { InsulinAttribute } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
export interface IEntryInsulinIntakePicker {
    pickedIntake: BehaviorSubject<InsulinAttribute>;
}