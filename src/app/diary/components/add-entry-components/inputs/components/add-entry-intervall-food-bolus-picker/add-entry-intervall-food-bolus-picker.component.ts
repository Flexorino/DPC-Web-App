import { Component, OnInit, Input } from '@angular/core';
import { IEntryIntervallInsulinIntakePicker } from '../../interfaces/IEntryIntervallInsulinIntakePicker';
import { BehaviorSubject } from 'rxjs';
import { IntervallInsulinIntake } from 'src/shared/model/diary/entry/attributes/intervall-insulin-intake';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-entry-intervall-food-bolus-picker',
  templateUrl: './add-entry-intervall-food-bolus-picker.component.html',
  styleUrls: ['./add-entry-intervall-food-bolus-picker.component.scss']
})
export class AddEntryIntervallFoodBolusPickerComponent implements OnInit, IEntryIntervallInsulinIntakePicker {

  pickedIntake: BehaviorSubject<IntervallInsulinIntake> = new BehaviorSubject(null);
  insulinAttribute: IntervallInsulinIntake;

  constructor(private fb: FormBuilder) { }

  @Input("group") group: FormGroup;
  @Input("selectedNormalBolus") selectedNormalBolus = 5;

  ngOnInit() {

  }

}
