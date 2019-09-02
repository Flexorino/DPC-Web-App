import { FormService } from './../../../../../../../shared/services/form-service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NavUtil } from 'src/shared/util/navigation.util';
import { IBolusUtilDao } from 'src/shared/services/DAO/i-bolus-util-dao';
import { ConstructionConstrol } from 'src/shared/util/construction-control';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { FormUtil } from 'src/shared/util/form-util';

@Component({
  selector: 'app-add-entry-bsmeasure-entry',
  templateUrl: './add-entry-bsmeasure-entry.component.html',
  styleUrls: ['./add-entry-bsmeasure-entry.component.scss']
})
export class AddEntryBSMeasureEntryComponent implements OnInit, AfterViewInit {

  //CONTROLS
  private timeStampControl: ConstructionConstrol<ConstructionControlValue<Date>> = new ConstructionConstrol(null, [(x: ConstructionConstrol<ConstructionControlValue<Date>>) => x.value && x.value.constructed ? null : { 'required': null }]);
  private bsMeasureControl: ConstructionConstrol<ConstructionControlValue<number>> = new ConstructionConstrol(null);

  //CONSTRUCTION

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
    FormUtil.waitForInitialization(this.timeStampControl, this.bsMeasureControl).subscribe(this.handleSubFormSubsciptions);
    this.initializeForms();
  }

  private initializeForms() { 
    this.firstFormGroup = this.fb.group({
      timestamp: this.timeStampControl,
      bsMeasure: this.bsMeasureControl
    });
    this.mainFormGroup = this.fb.group({ timeAndBs: this.firstFormGroup, bolusEtc: this.secondFormGroup });

  }

  private handleSubFormSubsciptions() {

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

}
