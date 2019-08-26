import { IEntryBSPicker } from './../inputs/interfaces/IEntryBSPicker';
import { AddEntryActionsProps } from './../sharedActionsProps.ts/add-entry-props';
import { AddIngestionActions } from './add-ingestion.actions';
import { SettingsService } from 'src/shared/services/settings.service';
import { pipe, Subscription, Observable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatStepper, MatStep } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { FullScreenModalCloser } from 'src/shared/components/base-full-screen-modal/full_screen_closer.service';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { IEntryTimestampPicker } from '../inputs/interfaces/IEntryTimestampPicker';
import { IEntryFoodIntakeListPicker } from '../inputs/interfaces/IEntryFoodIntakeListPicker';
import { delay, map } from 'rxjs/operators';
import { IEntrySimpleInsulinIntakePicker } from '../inputs/interfaces/IEntryInsulinIntakePicker';

@Component({
  selector: 'app-add-ingestion',
  templateUrl: './add-ingestion.component.html',
  styleUrls: ['./add-ingestion.component.scss']
})
export class AddIngestionComponent implements OnInit, AfterViewInit {

  // main form groups
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  mainFormGroup: FormGroup;

  // sub form groups
  timestampFormGroup: FormGroup = new FormGroup({});
  @ViewChild("timeStamp", { static: false }) timeStampPicker: IEntryTimestampPicker;
  bsMeasureFormGroup: FormGroup = new FormGroup({});
  @ViewChild("bsMeasure", { static: false }) bsMeasurePicker: IEntryBSPicker;
  foodPickerFormGroup: FormGroup = new FormGroup({});
  @ViewChild("foodIntakeListPicker", { static: false }) foodIntakeListPicker: IEntryFoodIntakeListPicker;
  simpleFoodBolusForm: FormGroup = new FormGroup({});
  @ViewChild("foodBolus", { static: false }) foodBolusPicker: IEntrySimpleInsulinIntakePicker;
  intervallFoodBolusForm: FormGroup = new FormGroup({});
  @ViewChild("intervallFoodBolus", { static: false }) intervallFoodBolus: IEntrySimpleInsulinIntakePicker;
  correctionBolusForm: FormGroup = new FormGroup({});
  @ViewChild("correctionBolus", { static: false }) correctionBolus: IEntrySimpleInsulinIntakePicker;

  // subscriptions
  private contextSubscription: Subscription;
  private fragmentSubscription;

  // misc:
  selectedNormalBolus: Subject<number> = new Subject();
  isLastStep: boolean = false;
  currentStep = 0;
  delayedBolus = false;
  loading = true;
  @ViewChild("stepper", { static: false }) private stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private settings: SettingsService,
    private closer: FullScreenModalCloser,
    private store: Store<any>
  ) { }

  ngAfterViewInit(): void {
    this.handleFragmentNavigationStuff();
    this.timeStampPicker.timestamp.subscribe(x => console.log(new Date(x * 1000).toISOString()))
    this.bsMeasurePicker.bs.subscribe(x => console.log("BS: " + x));
    this.foodIntakeListPicker.foodArray.subscribe(x => {
      console.log("CHANGE: " + JSON.stringify(x));
    }
    );
    this.foodBolusPicker.pickedIntake.subscribe(x => console.log("BOLUS: " + JSON.stringify(x)));
    setTimeout(() => this.foodBolusPicker.pickedIntake.subscribe(x => this.selectedNormalBolus.next(x ? x.units : null)));
    this.intervallFoodBolus.pickedIntake.subscribe(x => {
      console.log("INTERVALL: " + JSON.stringify(x) + " VALID " + this.intervallFoodBolusForm.valid);
    })
    this.correctionBolus.pickedIntake.subscribe(x => console.log("CORRECTION: " + JSON.stringify(x)));
  }

  ngOnInit() {
    this.initializeForms();
    let action = AddIngestionActions.OPENED(new CompletableAction(this));
    this.store.dispatch(action);
    action.then(x => this.loading = false);

  }

  private handleFragmentNavigationStuff() {
    this.fragmentSubscription = this.currentRoute.fragment.pipe(delay(0)).subscribe(z => {
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
      this.router.navigate([], { fragment: z.selectedIndex + "" });
    });
  }

  private initializeForms(): void {
    this.firstFormGroup = this.fb.group({
      timestamp: this.timestampFormGroup,
      bs: this.bsMeasureFormGroup
    });
    this.secondFormGroup = this.fb.group({
      meals: this.foodPickerFormGroup
    });
    this.thirdFormGroup = this.fb.group({
      mealBolus: this.simpleFoodBolusForm,
      intervallFoodBolus: this.intervallFoodBolus
    });
    this.mainFormGroup = this.fb.group({ timeAndBs: this.firstFormGroup, mealForm: this.secondFormGroup, bolusEtc: this.thirdFormGroup });
  }

  submit() {
    let action = new AddEntryActionsProps(this, new Entry(123));
    this.store.dispatch(AddIngestionActions.CONFIRM(action));
    this.loading = true;
    action.then(x => this.closer.close()).catch(err => {
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es päter erneut");
      this.closer.close();
    })
  }
}
