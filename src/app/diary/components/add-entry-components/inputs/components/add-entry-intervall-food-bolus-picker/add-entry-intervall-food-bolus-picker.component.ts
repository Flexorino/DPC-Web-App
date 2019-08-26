import { BaseInsulinIntakeSemantics } from './../../../../../../../shared/model/diary/entry/attributes/insulin-attribute';
import { Component, OnInit, Input } from '@angular/core';
import { IEntryIntervallInsulinIntakePicker } from '../../interfaces/IEntryIntervallInsulinIntakePicker';
import { BehaviorSubject, Observable } from 'rxjs';
import { IntervallInsulinIntake } from 'src/shared/model/diary/entry/attributes/intervall-insulin-intake';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.insulinAttribute = new IntervallInsulinIntake();
    this.insulinAttribute.semanticIdentifier = BaseInsulinIntakeSemantics.FOOD_BOLUS;
    this.insulinAttribute.insulin = null;

    this.selectedBolusObservable.subscribe(x => {
      if (this.relativeBolusPortion > x) {
        this.relativeBolusPortion = x;
      }
      this.currentPreSelectedBolus = x;
    });

    let relativePortionControl = this.fb.control('');
    let fixPortionControl = this.fb.control('', [Validators.min(1), Validators.max(50)]);
    let timeIntervallControl = this.fb.control('', [(x: AbstractControl) => !x.value && this.activated ? { 'timeIntervallNeedsTobeSet': {} } : null]);
    this.group.addControl('relativePortionControl', relativePortionControl);
    this.group.addControl('fixPortionControl', fixPortionControl);
    this.group.addControl('timeIntervallControl', timeIntervallControl);

    this.group.valueChanges.subscribe(x => {

      try {
        let sum = (relativePortionControl.value ? Number.parseInt(relativePortionControl.value) : 0) + (fixPortionControl.value ? Number.parseInt(fixPortionControl.value) : 0);
        this.insulinAttribute.units = sum;
        if(timeIntervallControl.value){
          let time = 0;
          let value : string = timeIntervallControl.value;
          time += value.split(':')[0]? Number.parseInt(value.split(':')[0]) * 60 : 0;
          time += value.split(':')[1]? Number.parseInt(value.split(':')[1]) : 0;
          this.intervallMinutes = time;
        }
      } catch (e) {

      }
    });

    relativePortionControl.valueChanges.subscribe(x => this.relativeBolusPortion = Number.parseInt(x));

  }

  onToggle() {
    this.activated = !this.activated;
    if (this.activated) {
      this.pickedIntake.next(this.insulinAttribute);
    } else {
      this.pickedIntake.next(null);
    }
  }

}
