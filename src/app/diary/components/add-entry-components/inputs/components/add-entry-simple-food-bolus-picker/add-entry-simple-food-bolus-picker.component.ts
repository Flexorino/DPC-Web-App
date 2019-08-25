import { SimpleInsulinIntake } from 'src/shared/model/diary/entry/attributes/simple-Insulin-intake';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { IEntrySimpleInsulinIntakePicker } from '../../interfaces/IEntryInsulinIntakePicker';
import { InsulinAttribute } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-entry-simple-food-bolus-picker',
  templateUrl: './add-entry-simple-food-bolus-picker.component.html',
  styleUrls: ['./add-entry-simple-food-bolus-picker.component.scss']
})
export class AddEntrySimpleFoodBolusPickerComponent implements OnInit, IEntrySimpleInsulinIntakePicker {
  pickedIntake: BehaviorSubject<InsulinAttribute> = new BehaviorSubject(null);
  insulinAttribute: SimpleInsulinIntake;

  constructor(private fb: FormBuilder) { }

  @Input("group") group: FormGroup;

  ngOnInit() {
    this.insulinAttribute = new SimpleInsulinIntake();
    this.insulinAttribute.insulin = null;
    this.insulinAttribute.semanticIdentifier = "FOOD_BOLUS";
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