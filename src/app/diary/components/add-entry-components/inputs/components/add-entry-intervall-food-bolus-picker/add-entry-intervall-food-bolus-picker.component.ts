import { BaseInsulinIntakeSemantics } from './../../../../../../../shared/model/diary/entry/attributes/insulin-attribute';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { IEntryIntervallInsulinIntakePicker } from '../../interfaces/IEntryIntervallInsulinIntakePicker';
import { BehaviorSubject, Observable } from 'rxjs';
import { IntervallInsulinIntake } from 'src/shared/model/diary/entry/attributes/intervall-insulin-intake';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, ControlValueAccessor } from '@angular/forms';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-add-entry-intervall-food-bolus-picker',
  templateUrl: './add-entry-intervall-food-bolus-picker.component.html',
  styleUrls: ['./add-entry-intervall-food-bolus-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEntryIntervallFoodBolusPickerComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AddEntryIntervallFoodBolusPickerComponent), multi: true }]
})
export class AddEntryIntervallFoodBolusPickerComponent implements OnInit, Validator, ControlValueAccessor {

  //CONTROLS
  relativPart: FormControl
  absolutePart: FormControl;
  activated: FormControl;
  time: FormControl;

  //CONSTRUCTION
  construction: Observable<ConstructionControlValue<IntervallInsulinIntake>>;

  group: FormGroup = new FormGroup({});
  @Input("selectedBolusObservable") selectedBolusObservable: Observable<number>;

  //MISC
  currentSelectedNormalBolus = 0;
  currentSumBolus = 0;
  currentTimeIntervall = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.relativPart = this.fb.control(null);
    this.absolutePart = this.fb.control('', [Validators.min(1), Validators.max(50)]);
    this.time = this.fb.control('00:00', [(x: AbstractControl) => this.getTimeIntervallInMinutes() ? this.getTimeIntervallInMinutes() > 5 ? null : { timeIntervallToSmol: null } : null]);
    this.activated = this.fb.control(false);

    this.group.addControl('relativePortionControl', this.relativPart);
    this.group.addControl('fixPortionControl', this.absolutePart);
    this.group.addControl('timeIntervallControl', this.time);
    this.group.addControl('activated', this.activated);
    this.group.setValidators([(x: AbstractControl) => {
      if (!this.activated.value) {
        return null;
      }
      let intake = this.constructIntervallBolus();
      return intake ? intake.endTimeStamp && intake.units ? null : { notComplete: null } : { notComplete: null };
    }]);
    this.construction = this.group.valueChanges.pipe(delay(0), map(x => {
      if (!this.activated.value) {
        return new ConstructionControlValue(this.group.value, null);
      }
      return new ConstructionControlValue(this.group.value, this.constructIntervallBolus());
    }));
    this.selectedBolusObservable.subscribe(x => {
      let current = Number.parseInt(this.relativPart.value);
      if (current > x) {
        this.relativPart.setValue(x ? x : 0);
      }
      this.currentSelectedNormalBolus = x ? x : 0;
    });

  }

  private constructIntervallBolus(): IntervallInsulinIntake {
    let constructed: IntervallInsulinIntake = new IntervallInsulinIntake();
    constructed.semanticIdentifier = BaseInsulinIntakeSemantics.FOOD_BOLUS;
    constructed.endTimeStamp = null;
    constructed.units = null;
    try {
      let sum = (this.relativPart.value ? Number.parseInt(this.relativPart.value) : 0) + (this.absolutePart.value ? Number.parseInt(this.absolutePart.value) : 0);
      constructed.units = sum;
      let time = this.getTimeIntervallInMinutes();
      constructed.units = sum;
      this.currentSumBolus = sum;
      if (time) {
        let date = new Date();
        date.setMinutes(date.getMinutes() + time);
        constructed.endTimeStamp = date;
      }
      this.currentTimeIntervall = time;
    } catch (e) { }
    return constructed;
  }

  private getTimeIntervallInMinutes(): number {
    let time = null;
    if (this.time && this.time.value) {
      try {
        time = 0;
        let value: string = this.time.value;
        time += value.split(':')[0] ? Number.parseInt(value.split(':')[0]) * 60 : 0;
        time += value.split(':')[1] ? Number.parseInt(value.split(':')[1]) : 0;
      } catch (e) {
        return null;
      }
    }
    return time;
  }

  writeValue(obj: any): void {
    if (!obj) {
      this.setToInitial();
      return;
    }
    if (!(obj instanceof ConstructionControlValue)) {
      throw new Error("Invalid Value");
    } else if (obj.raw) {
      this.group.setValue(obj.raw);
    } else {
      if (!obj.constructed) {
        this.activated.setValue(false);
        this.time.setValue(null);
        this.relativPart.setValue(null);
        this.absolutePart.setValue(null);
      } else {
        throw new Error("NOT IMPLEMENTED");
      }
    }
  }

  private setToInitial() {
    this.activated.setValue(false);
    this.time.setValue("00:00");
    this.relativPart.setValue(null);
    this.absolutePart.setValue(null);
  }

  registerOnChange(fn: any): void {
    this.construction.subscribe(fn);
    this.group.setValue(this.group.value);
  }

  registerOnTouched(fn: any): void {
  }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    return this.group.valid ? null : { curruptedControlState: null };
  }
}
