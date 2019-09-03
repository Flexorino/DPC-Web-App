
import { FoodIntakeAttribute } from './../../../../../../../shared/model/diary/entry/attributes/food-intake-attribute';
import { Component, OnInit, forwardRef } from '@angular/core';
import { Validator, ControlValueAccessor, FormControl, FormGroup, FormBuilder, Validators, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { SettingsService } from 'src/shared/services/settings.service';

@Component({
  selector: 'app-fast-keinput',
  templateUrl: './fast-keinput.component.html',
  styleUrls: ['./fast-keinput.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FastKEInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => FastKEInputComponent), multi: true }
  ]
})
export class FastKEInputComponent implements OnInit, Validator, ControlValueAccessor {

  //CONTROLS
  fastke: FormControl

  group: FormGroup = new FormGroup({});

  //CONSTRUCTION
  construction: Observable<ConstructionControlValue<FoodIntakeAttribute>>;
  keFactor : number;

  constructor(private fb: FormBuilder, private settings: SettingsService) {
    this.keFactor = this.settings.carbsFactorSubj.getValue();
  }


  ngOnInit() {
    this.fastke = this.fb.control(null, [Validators.min(0.01), Validators.max(50)]);
    this.group.addControl("ke", this.fastke);
    this.construction = this.fastke.valueChanges.pipe(delay(0), map(x => 
      
      {
        if(!this.fastke.value) {
          return new ConstructionControlValue(this.group.value,null);
        }
        let y = null;
        try { y = Number.parseFloat(this.fastke.value)} catch(e){}
        let intake = new FoodIntakeAttribute();
        intake.amount = y;
        return new ConstructionControlValue(this.group.value,intake);
      }));
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
        this.fastke.setValue(null);
      } else {
        let z : FoodIntakeAttribute = obj.constructed;
        this.fastke.setValue((z.amount*this.keFactor).toFixed(2));
      }
    }
  }

  private setToInitial() {
    this.fastke.setValue(null);
  }

  registerOnChange(fn: any): void {
    this.construction.subscribe(x => fn(x));
    this.group.setValue(this.group.value);
  }

  registerOnTouched(fn: any): void {
  }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    return this.group.valid ? null : { curruptedControlState: null };
  }
}
