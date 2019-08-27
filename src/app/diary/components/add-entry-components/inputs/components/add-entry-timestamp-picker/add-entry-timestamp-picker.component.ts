import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IEntryTimestampPicker } from '../../interfaces/IEntryTimestampPicker';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-entry-timestamp-picker',
  templateUrl: './add-entry-timestamp-picker.component.html',
  styleUrls: ['./add-entry-timestamp-picker.component.scss']
})
export class AddEntryTimestampPickerComponent implements OnInit, IEntryTimestampPicker {
  timestamp: BehaviorSubject<Date> = new BehaviorSubject(null);

  @Input('group') group: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    let cur: Date = new Date();
    let time = cur.getHours() + ":" + cur.getMinutes();
    let curdate = cur.toISOString().slice(0, 10);
    this.timestamp.next(cur);
    this.group.addControl("time", this.fb.control(time, Validators.required));
    this.group.addControl("date", this.fb.control(curdate, Validators.required));
    this.group.valueChanges.subscribe((y) => {
      if (this.group.valid) {
        let timestamp = 0;
        let secondsString: string = this.group.get("time").value;
        let date: Date = new Date(<string>this.group.get("date").value);
        date.setHours(Number.parseInt(secondsString.split(':')[0]));
        date.setMinutes(timestamp += Number.parseInt(secondsString.split(':')[1]));
        this.timestamp.next(date); 
      }
    });
  }

}
