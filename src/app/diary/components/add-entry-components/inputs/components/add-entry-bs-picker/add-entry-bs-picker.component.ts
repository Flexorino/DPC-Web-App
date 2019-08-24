import { BSUnit } from 'src/shared/services/BSUnit';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { max } from 'rxjs/operators';
import { SettingsService } from 'src/shared/services/settings.service';
import { IEntryBSPicker } from '../../interfaces/IEntryBSPicker';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'add-entry-bs-picker',
  templateUrl: './add-entry-bs-picker.component.html',
  styleUrls: ['./add-entry-bs-picker.component.scss']
})
export class AddEntryBSPicker implements OnInit, IEntryBSPicker {

  @Input('group') group: FormGroup;

  bs: BehaviorSubject<number> = new BehaviorSubject(null);
  bsUnit: BSUnit;

  constructor(private fb: FormBuilder, settings: SettingsService) {
    this.bsUnit = settings.bsUnitSettingSubj.getValue();
  }

  ngOnInit() {
    this.group.addControl("bsMeasure", this.fb.control('', [Validators.min(1 * this.bsUnit.factor), Validators.max(30 * this.bsUnit.factor)]))
    this.group.valueChanges.subscribe(x => this.group.valid ? this.group.get("bsMeasure").value ? this.bs.next(this.group.get("bsMeasure").value as number / this.bsUnit.factor) : this.bs.next(null) : null);
  }

}
