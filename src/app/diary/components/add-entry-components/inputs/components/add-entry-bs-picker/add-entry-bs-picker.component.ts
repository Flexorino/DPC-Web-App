import { BSUnit } from 'src/shared/services/BSUnit';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ControlValueAccessor, Validator, FormControl } from '@angular/forms';
import { max, map, catchError } from 'rxjs/operators';
import { SettingsService } from 'src/shared/services/settings.service';
import { IEntryBSPicker } from '../../interfaces/IEntryBSPicker';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';

@Component({
  selector: 'add-entry-bs-picker',
  templateUrl: './add-entry-bs-picker.component.html',
  styleUrls: ['./add-entry-bs-picker.component.scss']
})
export class AddEntryBSPicker implements OnInit, ControlValueAccessor, Validator {

  //CONTROLS
  bsMeasure: FormControl

  group: FormGroup = new FormGroup({});
  bsUnit: BSUnit;

  //CONSTRUCTION
  construction: Observable<ConstructionControlValue<number>>;

  constructor(private fb: FormBuilder, private settings: SettingsService) {}

  ngOnInit() {
    this.bsUnit = this.settings.bsUnitSettingSubj.getValue();
    this.bsMeasure = this.fb.control(null, [Validators.min(1 * this.bsUnit.factor), Validators.max(30 * this.bsUnit.factor)]);
    this.group.addControl("bsMeasure", this.bsMeasure);
    this.construction = this.bsMeasure.valueChanges.pipe(map(x => new ConstructionControlValue(this.group.value, Number.parseFloat(x)), catchError(err => of(new ConstructionControlValue(this.group.value, null)))));
   
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
        this.bsMeasure.setValue(null);
      } else {
        throw new Error("notimplemented");
      }
    }
  }

  private setToInitial() { }

  registerOnChange(fn: any): void {
    this.construction.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
  }

  
  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    throw new Error("Method not implemented.");
  }
}
