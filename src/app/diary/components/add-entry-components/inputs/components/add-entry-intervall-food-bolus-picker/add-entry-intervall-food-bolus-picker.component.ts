import { BaseInsulinIntakeSemantics } from './../../../../../../../shared/model/diary/entry/attributes/insulin-attribute';
import { Component, OnInit, Input } from '@angular/core';
import { IEntryIntervallInsulinIntakePicker } from '../../interfaces/IEntryIntervallInsulinIntakePicker';
import { BehaviorSubject, Observable } from 'rxjs';
import { IntervallInsulinIntake } from 'src/shared/model/diary/entry/attributes/intervall-insulin-intake';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-entry-intervall-food-bolus-picker',
  templateUrl: './add-entry-intervall-food-bolus-picker.component.html',
  styleUrls: ['./add-entry-intervall-food-bolus-picker.component.scss']
})
export class AddEntryIntervallFoodBolusPickerComponent implements OnInit, IEntryIntervallInsulinIntakePicker {

  @Input("group") group: FormGroup;
  @Input("selectedBolusObservable") selectedBolusObservable: Observable<number>;

  currentPreSelectedBolus: number = 0;
  pickedIntake: BehaviorSubject<IntervallInsulinIntake> = new BehaviorSubject(null);
  insulinAttribute: IntervallInsulinIntake;

  intervallMinutes = 0;
  relativeBolusPortion: number = 0;
  activated = false;

  relativePortionControl: FormControl;
  kek: FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.insulinAttribute = new IntervallInsulinIntake();
    this.insulinAttribute.semanticIdentifier = BaseInsulinIntakeSemantics.FOOD_BOLUS;
    this.insulinAttribute.insulin = null;

    this.selectedBolusObservable.subscribe(x => {
      if (this.relativeBolusPortion > x) {
        this.relativePortionControl.setValue(x ? x : 0);
      }
      this.currentPreSelectedBolus = x;
    });

    this.relativePortionControl = this.fb.control('');
    let relativePortionControl = this.relativePortionControl;
    let fixPortionControl = this.fb.control('', [Validators.min(1), Validators.max(50)]);
    let timeIntervallControl = this.fb.control('', [(x: AbstractControl) => !x.value && this.activated ? { 'timeIntervallNeedsTobeSet': {} } : null]);
    this.kek = timeIntervallControl;
    this.group.addControl('relativePortionControl', relativePortionControl);
    this.group.addControl('fixPortionControl', fixPortionControl);
    this.group.addControl('timeIntervallControl', timeIntervallControl);
    this.group.setValidators([x => {
      console.log("VALIDATE");
      return this.activated && !relativePortionControl.value && !fixPortionControl.value ? { 'BolusNeedToBeSet': {} } : null
    }]);

    this.group.valueChanges.subscribe(x => {

      try {
        let sum = (relativePortionControl.value ? Number.parseInt(relativePortionControl.value) : 0) + (fixPortionControl.value ? Number.parseInt(fixPortionControl.value) : 0);
        this.insulinAttribute.units = sum;
        let time = 0;
        if (timeIntervallControl.value) {
          let value: string = timeIntervallControl.value;
          time += value.split(':')[0] ? Number.parseInt(value.split(':')[0]) * 60 : 0;
          time += value.split(':')[1] ? Number.parseInt(value.split(':')[1]) : 0;
          this.intervallMinutes = time;
        }
        this.insulinAttribute.units = sum;
        let date = new Date();
        date.setMinutes(date.getMinutes() + time);
        this.insulinAttribute.endTimeStamp = date;
        this.pickedIntake.next(this.insulinAttribute);

      } catch (e) {

      }
    });

    relativePortionControl.valueChanges.subscribe(x => this.relativeBolusPortion = x ? Number.parseInt(x) : 0);

  }

  onToggle() {
    this.activated = !this.activated;
    if (this.activated) {
      this.pickedIntake.next(this.insulinAttribute);
    } else {
      this.pickedIntake.next(null);
    }
    this.group.setValue(this.group.value);
  }

}
