import { ConstructionConstrol } from './../../../../../shared/util/construction-control';
import { SimpleInsulinIntake } from './../../../../../shared/model/diary/entry/attributes/simple-Insulin-intake';
import { BaseInsulinIntakeSemantics } from './../../../../../shared/model/diary/entry/attributes/insulin-attribute';
import { IEntryBSPicker } from './../inputs/interfaces/IEntryBSPicker';
import { AddEntryActionsProps } from './../sharedActionsProps.ts/add-entry-props';
import { AddIngestionActions } from './add-ingestion.actions';
import { SettingsService } from 'src/shared/services/settings.service';
import { pipe, Subscription, Observable, Subject, merge } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, Inject, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
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
import { InsulinAttribute } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
import { IBolusUtilDao } from 'src/shared/services/DAO/i-bolus-util-dao';
import { X } from '@angular/cdk/keycodes';
import { NavUtil } from 'src/shared/util/navigation.util';
import { ConstructionControlValue } from 'src/shared/util/construction-constrol-value';
import { SaverTestService } from 'src/shared/services/savertest.service';

@Component({
  selector: 'app-add-ingestion',
  templateUrl: './add-ingestion.component.html',
  styleUrls: ['./add-ingestion.component.scss']
})
export class AddIngestionComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.saver.save = this.firstFormGroup.value;
  }

  // main form groups
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  mainFormGroup: FormGroup;

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

  private timeStampControl: ConstructionConstrol<ConstructionControlValue<Date>> = new ConstructionConstrol(null, [(x : ConstructionConstrol<ConstructionControlValue<Date>>)=> x.value && x.value.constructed? null : {'required': null}]);

  // misc:
  currentTimestamp: Subject<Date> = new Subject();
  selectedNormalBolus: Subject<number> = new Subject();
  delayedBolus = false;
  loading = true;
  @ViewChild("stepper", { static: false }) private stepper: MatStepper;

  entryInModification: Entry = new Entry(null);

  constructor(
    private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private settings: SettingsService,
    private closer: FullScreenModalCloser,
    private store: Store<any>,
    private navUtil: NavUtil,
    private saver : SaverTestService, 
    @Inject("IBolusUtilDao") private bolusDao: IBolusUtilDao
  ) { }

    get firstForm() {
      return JSON.stringify(this.firstFormGroup.value);
    }

  private handleSubFormSubsciptions() {
    merge(this.timeStampControl.valueChanges, this.bsMeasurePicker.bs, this.foodIntakeListPicker.foodArray,
      this.foodBolusPicker.pickedIntake, this.intervallFoodBolus.pickedIntake, this.correctionBolus.pickedIntake).subscribe(x => {
        this.entryInModification = new Entry(null);
        this.entryInModification.foodIntakes = this.foodIntakeListPicker.foodArray.getValue();
        let insulinIntake: Array<InsulinAttribute> = [];
        if (this.foodBolusPicker.pickedIntake.getValue()) {
          insulinIntake.push(this.foodBolusPicker.pickedIntake.getValue());
        }
        if (this.intervallFoodBolus.pickedIntake.getValue()) {
          insulinIntake.push(this.intervallFoodBolus.pickedIntake.getValue());
        }
        if (this.correctionBolus.pickedIntake.getValue()) {
          insulinIntake.push(this.correctionBolus.pickedIntake.getValue());
        }
        this.entryInModification.insulinIntakes = insulinIntake;
        this.entryInModification.bloodSuger = this.bsMeasurePicker.bs.getValue();
        this.entryInModification.timeStamp = this.timeStampControl.value.constructed;
        console.log("NEW ENTRY: " + JSON.stringify(this.entryInModification));
        console.log("FFOORRMM: " + JSON.stringify(this.mainFormGroup.value));
      });
  }

  ngAfterViewInit(): void {
    this.handleFragmentNavigationStuff();
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
    this.handleSubFormSubsciptions();
  }

  ngOnInit() {
    this.initializeForms();
    if(this.saver.save){
      this.firstFormGroup.setValue(this.saver.save);
    }
    let action = AddIngestionActions.OPENED(new CompletableAction(this));
    this.store.dispatch(action);
    action.then(x => this.loading = false);
  }

  get isLastStep(): boolean {
    return this.stepper ? this.stepper.selectedIndex + 1 === this.stepper.steps.length : false;
  }
  get currentStep(): number {
    return this.stepper ? this.stepper.selectedIndex : 0;
  }

  private handleFragmentNavigationStuff() {
    this.navUtil.synchroniceFragmentNavigation(this.stepper);
  }

  private initializeForms(): void {
    this.firstFormGroup = this.fb.group({
      timestamp: this.timeStampControl
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
    if (this.mainFormGroup.valid) {
      let action = new AddEntryActionsProps(this, new Entry(123));
      this.store.dispatch(AddIngestionActions.CONFIRM(action));
      this.loading = true;
      action.then(x => this.closer.close()).catch(err => {
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es päter erneut");
        this.closer.close();
      })
    }
  }

  onBolusRequest() {
    this.loading = true;
    this.bolusDao.getBolusSuggestion(this.entryInModification).subscribe(x => {
      this.foodBolusPicker.setUnits(x.insulinIntakes.find(x => x.semanticIdentifier === BaseInsulinIntakeSemantics.FOOD_BOLUS && x instanceof SimpleInsulinIntake).units)
      this.loading = false;
    });

  }

  compare(){
    this.timeStampControl.setValue(null);
    let x = this.timeStampControl.value;
    console.log("Xx xX:"+ JSON.stringify(x));
  }
}
