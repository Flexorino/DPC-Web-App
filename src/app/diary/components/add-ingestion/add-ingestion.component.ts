import { pipe } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
  sum = 0;

  private handleFragmentNavigationStuff() {
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

  ngAfterViewInit(): void {
    this.handleFragmentNavigationStuff();

  }

  @ViewChild("stepper", { static: false }) private stepper: MatStepper;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private fragmentSubscription;

  constructor(private _formBuilder: FormBuilder, private currentRoute: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {
    let cur: Date = new Date();
    let time = cur.getHours() + ":" + cur.getMinutes();
    let curdate = cur.toISOString().slice(0, 10);
    this.firstFormGroup = this._formBuilder.group({
      time: [time, Validators.required],
      date: [curdate, Validators.required],
      bs: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      meals: this._formBuilder.array([])
    });
    this.addMeal();

  }

  get meals() {
    let z = this.secondFormGroup.get('meals') as FormArray;
    return z;
  }

  next() {
    this.stepper.selectedIndex += 1;
  }

  addMeal() {
    let grp: FormGroup = this._formBuilder.group({ KE: [], });
    grp.get("KE").valueChanges.subscribe(x => {
      this.calculateMealSum();
    });
    this.meals.push(grp);
  }

  private calculateMealSum() {
    if (this.meals.controls.length === 0) {
      this.sum = 0;
    } else {
      this.sum = this.meals.controls.map(element => {
        try {
          if (!element.get("KE").value) {
            return 0;
          }
          return Number.parseFloat(element.get("KE").value);
        } catch (e) {
          return 0;
        }
      }).reduce((x, y) => x + y);
    }
  }

  remove(i: number) {
    this.meals.removeAt(i);
    this.calculateMealSum();
  }
}
