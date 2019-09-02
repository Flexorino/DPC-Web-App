import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';

@Component({
  selector: 'app-add-entry-timestamp-picker',
  templateUrl: './add-entry-timestamp-picker.component.html',
  styleUrls: ['./add-entry-timestamp-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEntryTimestampPickerComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AddEntryTimestampPickerComponent), multi: true }
  ]
})
export class AddEntryTimestampPickerComponent implements OnInit, ControlValueAccessor, Validator {

  group: FormGroup = new FormGroup({});
  private obs: Subject<ConstructionControlValue<Date>> = new Subject();
  constructor(private fb: FormBuilder) { }

  timeConstrol: FormControl;
  dateControl: FormControl;
  timestamp: Date;
  ngOnInit() {
    this.dateControl = this.fb.control(null);
    this.timeConstrol = this.fb.control(null);
    this.group.addControl("time", this.timeConstrol);
    this.group.addControl("date", this.dateControl);
    timeStamp: Date;

    this.group.valueChanges.pipe(delay(0),map((y) => {
      let obj: ConstructionControlValue<Date> = new ConstructionControlValue();
      obj.raw = this.group.value;
      try {
        let timestamp = 0;
        let secondsString: string = this.group.get("time").value;
        let date: Date = new Date(<string>this.group.get("date").value);
        date.setHours(Number.parseInt(secondsString.split(':')[0]));
        date.setMinutes(timestamp += Number.parseInt(secondsString.split(':')[1]));
        obj.constructed = date;
        this.timestamp = date;
      } catch (e) {
        obj.constructed = null;
      }
      return obj;
    })).subscribe(x => this.obs.next(x));
  }

  get errors() {
    return JSON.stringify(this.group.errors);
  }

  private setToInitial() {
    let cur: Date = new Date();
    let time = cur.getHours() + ":" + cur.getMinutes();
    let curdate = cur.toISOString().slice(0, 10);
    this.dateControl.setValue(curdate);
    this.timeConstrol.setValue(time);
    this.timestamp = cur;
  }

  writeValue(obj: any): void {
    console.log("WRITEVALUE_FORTIME");
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
        this.timeConstrol.setValue(null);
        this.dateControl.setValue(null);
      } else {
        throw new Error("notimplemented");
      }
    }
  }

  registerOnChange(fn: any): void {
    this.obs.subscribe(fn);
    this.group.setValue(this.group.value);
  }
  registerOnTouched(fn: any): void {
    this.obs.subscribe(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  validate(control: AbstractControl): import("@angular/forms").ValidationErrors {
    return this.group.valid ? null : { curruptedControlState: null };
  }
}
