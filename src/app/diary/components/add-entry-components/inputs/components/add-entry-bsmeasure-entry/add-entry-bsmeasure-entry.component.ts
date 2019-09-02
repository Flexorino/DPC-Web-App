import { FormService } from './../../../../../../../shared/services/form-service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NavUtil } from 'src/shared/util/navigation.util';
import { SaverTestService } from 'src/shared/services/savertest.service';
import { IBolusUtilDao } from 'src/shared/services/DAO/i-bolus-util-dao';

@Component({
  selector: 'app-add-entry-bsmeasure-entry',
  templateUrl: './add-entry-bsmeasure-entry.component.html',
  styleUrls: ['./add-entry-bsmeasure-entry.component.scss']
})
export class AddEntryBSMeasureEntryComponent implements OnInit, AfterViewInit {

  //main form groups
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  mainFormGroup: FormGroup = new FormGroup({});

  @ViewChild("stepper", { static: false }) private stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private navUtil: NavUtil,
    private formService : FormService,
    @Inject("IBolusUtilDao") private bolusDao: IBolusUtilDao
  ) { }

  ngOnInit() {
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
