import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';

@Component({
  selector: 'app-add-entry-timestamp-picker',
  templateUrl: './add-entry-timestamp-picker.component.html',
  styleUrls: ['./add-entry-timestamp-picker.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEntryTimestampPickerComponent), multi: true }]
})
export class AddEntryTimestampPickerComponent implements OnInit, ControlValueAccessor {

  group: FormGroup = new FormGroup({});
  private obs: Subject<ConstructionControlValue<Date>> = new Subject();
  constructor(private fb: FormBuilder) { }

  timeConstrol: FormControl;
  dateControl: FormControl;

  ngOnInit() {
    this.dateControl = this.fb.control(null, Validators.required);
    this.timeConstrol = this.fb.control(null, Validators.required);
    this.group.addControl("time", this.timeConstrol);
    this.group.addControl("date", this.dateControl);

    this.group.valueChanges.pipe(map((y) => {
      let obj: ConstructionControlValue<Date> = new ConstructionControlValue();
      obj.raw = this.group.value;
      if (this.group.valid) {
        let timestamp = 0;
        let secondsString: string = this.group.get("time").value;
        let date: Date = new Date(<string>this.group.get("date").value);
        date.setHours(Number.parseInt(secondsString.split(':')[0]));
        date.setMinutes(timestamp += Number.parseInt(secondsString.split(':')[1]));
        obj.constructed = date;
      } else {
        obj.constructed = null;
      }
      return obj;
    })).subscribe(x => this.obs.next(x));
  }

  private setToInitial(){
    let cur: Date = new Date();
    let time = cur.getHours() + ":" + cur.getMinutes();
    let curdate = cur.toISOString().slice(0, 10);
    this.dateControl.setValue(curdate);
    this.timeConstrol.setValue(time);
  }

  writeValue(obj: any): void {
    if(!obj){
      this.setToInitial();
      return;
    }
    if (!(obj instanceof ConstructionControlValue)) {
      throw new Error("Invalid Value");
    } else if (obj.raw) {
      this.group = obj.raw;
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
    this.setToInitial();
  }
  registerOnTouched(fn: any): void {
    this.obs.subscribe(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}
