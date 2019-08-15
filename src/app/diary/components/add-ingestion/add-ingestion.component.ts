import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper, MatStep } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-ingestion',
  templateUrl: './add-ingestion.component.html',
  styleUrls: ['./add-ingestion.component.scss']
})
export class AddIngestionComponent implements OnInit, AfterViewInit {

  isLastStep: boolean = false;
  currentStep = 0;
  step: MatStep;

  ngAfterViewInit(): void {

    this.fragmentSubscription = this.currentRoute.fragment.subscribe(z => {
      if (z) {
        try {
          if (Number.parseInt(z) !== this.stepper.selectedIndex) {
            this.stepper.selectedIndex = Number.parseInt(z);
          }
          this.currentStep = Number.parseInt(z);
          if (Number.parseInt(z) + 1 === this.stepper.steps.length) {
            this.isLastStep = true;
          } else {
            this.isLastStep = false;
          }

        } catch (err) {
          this.stepper.selectedIndex = 0;
          this.currentStep = 0;
        }

      } else {
        this.stepper.selectedIndex = 0;
        this.currentStep = 0;
      }
    }
    );
    this.stepper.selectionChange.subscribe((z: StepperSelectionEvent) => {
      console.log("kek");
      this.router.navigate([], { fragment: z.selectedIndex + "" });
    });
  }

  @ViewChild("stepper", { static: false }) private stepper: MatStepper;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private fragmentSubscription;

  constructor(private _formBuilder: FormBuilder, private currentRoute: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  next() {
    this.stepper.selectedIndex += 1;
  }
}
