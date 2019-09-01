import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { IEntrySimpleInsulinIntakePicker } from '../../interfaces/IEntryInsulinIntakePicker';
import { BehaviorSubject } from 'rxjs';
import { InsulinAttribute, BaseInsulinIntakeSemantics } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
import { SimpleInsulinIntake } from 'src/shared/model/diary/entry/attributes/simple-Insulin-intake';
import { FormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-add-entry-simple-correction-bolus-picker',
  templateUrl: './add-entry-simple-correction-bolus-picker.component.html',
  styleUrls: ['./add-entry-simple-correction-bolus-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEntrySimpleCorrectionBolusPickerComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AddEntrySimpleCorrectionBolusPickerComponent), multi: true }]

})
export class AddEntrySimpleCorrectionBolusPickerComponent implements OnInit {

  pickedIntake: BehaviorSubject<InsulinAttribute> = new BehaviorSubject(null);
  insulinAttribute: SimpleInsulinIntake;

  constructor(private fb: FormBuilder) { }

  @Input("group") group: FormGroup;

  ngOnInit() {
    this.insulinAttribute = new SimpleInsulinIntake();
    this.insulinAttribute.insulin = null;
    this.insulinAttribute.semanticIdentifier = BaseInsulinIntakeSemantics.FOOD_BOLUS;
    let control = this.fb.control(null, [Validators.min(1), Validators.max(50)]);
    this.group.addControl('bolus', control);
    control.valueChanges.subscribe(x => {
      if (control.value) {
        try {
          this.insulinAttribute.units = Number.parseInt(control.value);
          this.pickedIntake.next(this.insulinAttribute);
        } catch (e) {

        }
      } else {
        this.pickedIntake.next(null);
      }
    });
  }
}
