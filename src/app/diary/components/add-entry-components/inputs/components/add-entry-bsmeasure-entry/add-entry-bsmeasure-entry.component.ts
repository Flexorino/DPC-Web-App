import { FormService } from './../../../../../../../shared/services/form-service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ControlValueAccessor } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NavUtil } from 'src/shared/util/navigation.util';
import { IBolusUtilDao } from 'src/shared/services/DAO/i-bolus-util-dao';
import { ConstructionConstrol } from 'src/shared/util/construction-control';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { FormUtil } from 'src/shared/util/form-util';
import { Observable, Subject } from 'rxjs';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { map } from 'rxjs/operators';

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
  private timeStampControl: ConstructionConstrol<ConstructionControlValue<Date>> = new ConstructionConstrol(null, [(x: ConstructionConstrol<ConstructionControlValue<Date>>) => x.value && x.value.constructed ? null : { 'required': null }]);
  private bsMeasureControl: ConstructionConstrol<ConstructionControlValue<number>> = new ConstructionConstrol(null);

  //CONSTRUCTION
  construction: Subject<ConstructionControlValue<Entry>> = new Subject();

  //main form groups
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  mainFormGroup: FormGroup = new FormGroup({});

  @ViewChild("stepper", { static: false }) private stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private navUtil: NavUtil,
    private formService: FormService,
    @Inject("IBolusUtilDao") private bolusDao: IBolusUtilDao
  ) { }

  ngOnInit() {
    this.initializeForms();
    FormUtil.waitForInitialization(this.timeStampControl, this.bsMeasureControl).subscribe(() => this.handleSubFormSubsciptions());
  }

  private initializeForms() {
    this.firstFormGroup = this.fb.group({
      timestamp: this.timeStampControl,
      bsMeasure: this.bsMeasureControl
    });
    this.mainFormGroup = this.fb.group({ timeAndBs: this.firstFormGroup, bolusEtc: this.secondFormGroup });
  }

  private handleSubFormSubsciptions() {
    FormUtil.getImmediateObservableFromRawControl(this.mainFormGroup).pipe(map(() => {
      return new ConstructionControlValue(this.mainFormGroup.value, new Entry(null));
    })).subscribe(x => this.construction.next(x));
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

  registerOnValidatorChange?(fn: () => void): void {
    this.mainFormGroup.statusChanges.subscribe(fn);
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
