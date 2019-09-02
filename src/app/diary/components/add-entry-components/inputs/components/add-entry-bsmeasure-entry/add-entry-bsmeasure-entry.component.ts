import { CustomValidators } from './../../../misc/custom-validators';
import { FormService } from './../../../../../../../shared/services/form-service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NavUtil } from 'src/shared/util/navigation.util';
import { IBolusUtilDao } from 'src/shared/services/DAO/i-bolus-util-dao';
import { ConstructionConstrol } from 'src/shared/util/construction-control';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { FormUtil } from 'src/shared/util/form-util';
import { Observable, Subject } from 'rxjs';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { map, delay, startWith } from 'rxjs/operators';
import { SimpleInsulinIntake } from 'src/shared/model/diary/entry/attributes/simple-Insulin-intake';
import { IntervallInsulinIntake } from 'src/shared/model/diary/entry/attributes/intervall-insulin-intake';

@Component({
  selector: 'app-add-entry-bsmeasure-entry',
  templateUrl: './add-entry-bsmeasure-entry.component.html',
  styleUrls: ['./add-entry-bsmeasure-entry.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddEntryBSMeasureEntryComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AddEntryBSMeasureEntryComponent), multi: true }]
})
export class AddEntryBSMeasureEntryComponent implements OnInit, AfterViewInit, Validator, ControlValueAccessor {
  //CONTROLS
  private timeStampControl: ConstructionConstrol<ConstructionControlValue<Date>> = new ConstructionConstrol(null, [CustomValidators.required]);
  private bsMeasureControl: ConstructionConstrol<ConstructionControlValue<number>> = new ConstructionConstrol(null);
  private simpleFoodBolusControl: ConstructionConstrol<ConstructionControlValue<SimpleInsulinIntake>> = new ConstructionConstrol(null);
  private intervallFoodBolusControl: ConstructionConstrol<ConstructionControlValue<IntervallInsulinIntake>> = new ConstructionConstrol(null);
  private correctionFoodBolusControl: ConstructionConstrol<ConstructionControlValue<SimpleInsulinIntake>> = new ConstructionConstrol(null);

  //CONSTRUCTION
  construction: Subject<ConstructionControlValue<Entry>> = new Subject();

  //main form groups
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  mainFormGroup: FormGroup = new FormGroup({});

  //MISC
  currentTimestamp: Subject<Date> = new Subject();
  selectedNormalBolus: Subject<number> = new Subject();
  currentBS: Subject<number> = new Subject();

  @ViewChild("stepper", { static: false }) private stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private navUtil: NavUtil,
    private formService: FormService,
    @Inject("IBolusUtilDao") private bolusDao: IBolusUtilDao
  ) { }

  ngOnInit() {
    FormUtil.waitForInitialization(this.timeStampControl, this.bsMeasureControl).subscribe(() => this.handleSubFormSubsciptions());
    this.initializeForms();
  }

  private initializeForms() {
    this.firstFormGroup = this.fb.group({
      timestamp: this.timeStampControl,
      bsMeasure: this.bsMeasureControl
    });
    this.secondFormGroup = this.fb.group({
      simpleFoodBolusControl: this.simpleFoodBolusControl,
      intervallFoodBolus: this.intervallFoodBolusControl,
      correctionFoodBolusControl: this.correctionFoodBolusControl
    });
    this.mainFormGroup = this.fb.group({ timeAndBs: this.firstFormGroup, bolusEtc: this.secondFormGroup });
    this.mainFormGroup.setValidators([FormUtil.save(((x: AbstractControl) => this.bsMeasureControl.value.constructed || this.simpleFoodBolusControl.value.constructed || this.correctionFoodBolusControl.value.constructed || this.intervallFoodBolusControl.value.constructed ? null : { atleastOneEntryAttributeNeedsToBeSet: null }))])
  }

  private handleSubFormSubsciptions() {
    FormUtil.getImmediateObservableFromRawControl(this.mainFormGroup).pipe(delay(0), map(() => {
      let entry = new Entry(null);
      entry.timeStamp = this.timeStampControl.value.constructed;
      entry.bloodSuger = this.bsMeasureControl.value.constructed;
      let insulinIntakes = [];
      if(this.simpleFoodBolusControl.value.constructed){
        insulinIntakes.push(this.simpleFoodBolusControl.value.constructed);
      }
      if(this.correctionFoodBolusControl.value.constructed){
        insulinIntakes.push(this.correctionFoodBolusControl.value.constructed);
      }
      if(this.intervallFoodBolusControl.value.constructed){
        insulinIntakes.push(this.intervallFoodBolusControl.value.constructed);
      }
      entry.insulinIntakes = insulinIntakes;
      return new ConstructionControlValue(this.mainFormGroup.value, entry);
    })).subscribe(x => this.construction.next(x));
    this.timeStampControl.valueChanges.pipe(startWith(this.timeStampControl.value)).subscribe(x => this.currentTimestamp.next(x.constructed));
    this.simpleFoodBolusControl.valueChanges.pipe(startWith(this.simpleFoodBolusControl.value)).subscribe(x => this.selectedNormalBolus.next(x.constructed ? x.constructed.units : null));
    this.bsMeasureControl.valueChanges.pipe(startWith(this.bsMeasureControl.value)).subscribe(x => this.currentBS.next(x.constructed));
  }

  get isLastStep(): boolean {
    return this.stepper ? this.stepper.selectedIndex + 1 === this.stepper.steps.length : false;
  }
  get currentStep(): number {
    return this.stepper ? this.stepper.selectedIndex : 0;
  }

  ngAfterViewInit(): void {
    this.navUtil.synchroniceFragmentNavigation(this.stepper);
  }

  submit() {
    this.formService.requestSubmit();
  }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    return this.mainFormGroup.valid ? null : { curruptedControlState: null };
  }

  writeValue(obj: any): void {
    if (!obj) {
      this.setToInitial();
      return;
    }
    if (!(obj instanceof ConstructionControlValue)) {
      throw new Error("Invalid Value");
    } else if (obj.raw) {
      this.mainFormGroup.setValue(obj.raw);
    } else {
      if (!obj.constructed) {
        throw new Error("NotImplemented");
      } else {
        throw new Error("NotImplemented");
      }
    }
  }

  private setToInitial() {
    this.mainFormGroup.reset();
  }

  registerOnChange(fn: any): void {
    this.construction.subscribe(fn);
    this.mainFormGroup.setValue(this.mainFormGroup.value);
  }

  registerOnTouched(fn: any): void {
  }
}
