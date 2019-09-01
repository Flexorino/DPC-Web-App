import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { IEntrySimpleInsulinIntakePicker } from '../../interfaces/IEntryInsulinIntakePicker';
import { BehaviorSubject, Observable } from 'rxjs';
import { InsulinAttribute, BaseInsulinIntakeSemantics } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
import { SimpleInsulinIntake } from 'src/shared/model/diary/entry/attributes/simple-Insulin-intake';
import { FormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, ControlValueAccessor } from '@angular/forms';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-entry-simple-correction-bolus-picker',
  templateUrl: './add-entry-simple-correction-bolus-picker.component.html',
  styleUrls: ['./add-entry-simple-correction-bolus-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEntrySimpleCorrectionBolusPickerComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AddEntrySimpleCorrectionBolusPickerComponent), multi: true }]

})
export class AddEntrySimpleCorrectionBolusPickerComponent implements OnInit, Validator, ControlValueAccessor {

  //CONTROLS
  bolus: FormControl

  //CONSTRUCTION
  construction: Observable<ConstructionControlValue<SimpleInsulinIntake>>;

  constructor(private fb: FormBuilder) { }

  group: FormGroup = new FormGroup({});

  ngOnInit() {
    let control = this.fb.control(null, [Validators.min(1), Validators.max(50)]);
    this.bolus = control;
    this.group.addControl('bolus', control);
    this.construction = control.valueChanges.pipe(map(x => {
      let z = new SimpleInsulinIntake();
      z.semanticIdentifier = BaseInsulinIntakeSemantics.FOOD_BOLUS;
      if (control.value) {
        try {
          z.units = Number.parseInt(control.value);
        } catch (e) {
          z.units = null;
        }
      } else {
        z = null;
      }
      return new ConstructionControlValue(this.group.value, z);
    }));
  }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    return this.group.valid ? null : { curruptedControlState: null };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.group.statusChanges.subscribe(fn);
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
        this.bolus.setValue(null);
      } else {
        let constr: ConstructionControlValue<SimpleInsulinIntake> = obj;
        this.bolus.setValue(constr.constructed.units);
      }
    }
  }

  private setToInitial() {
    this.bolus.setValue(null);
  }

  registerOnChange(fn: any): void {
    this.construction.subscribe(fn);
    this.group.setValue(this.group.value);
  }

  registerOnTouched(fn: any): void {
  }
}
