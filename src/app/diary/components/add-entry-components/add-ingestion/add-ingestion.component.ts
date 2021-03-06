import { CustomValidators } from './../misc/custom-validators';
import { DepthNavigationService } from './../../../../../shared/services/depth-navigation.service';
import { DiaryNavigationService } from './../../../../../shared/services/diary.navigation.service';
import { FoodIntakeAttribute } from 'src/shared/model/diary/entry/attributes/food-intake-attribute';
import { Food } from './../../../../../shared/model/diary/food';
import { ConstructionConstrol } from './../../../../../shared/util/construction-control';
import { SimpleInsulinIntake } from './../../../../../shared/model/diary/entry/attributes/simple-Insulin-intake';
import { BaseInsulinIntakeSemantics } from './../../../../../shared/model/diary/entry/attributes/insulin-attribute';
import { IEntryBSPicker } from './../inputs/interfaces/IEntryBSPicker';
import { AddEntryActionsProps } from './../sharedActionsProps.ts/add-entry-props';
import { AddIngestionActions } from './add-ingestion.actions';
import { SettingsService } from 'src/shared/services/settings.service';
import { pipe, Subscription, Observable, Subject, merge, combineLatest, BehaviorSubject, of } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, Inject, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { MatStepper, MatStep } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { ExtendedAction } from 'src/shared/actions/ExtendedAction';
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
import { FormUtil } from 'src/shared/util/form-util';
import { IntervallInsulinIntake } from 'src/shared/model/diary/entry/attributes/intervall-insulin-intake';
import { CurrentDiaryViewSerivce } from 'src/app/diary/services/CurrentDiaryView.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-add-ingestion',
  templateUrl: './add-ingestion.component.html',
  styleUrls: ['./add-ingestion.component.scss']
})
export class AddIngestionComponent implements OnInit, AfterViewInit, OnDestroy {

  //main form groups
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  mainFormGroup: FormGroup;

  //CONTROLS
  private timeStampControl: ConstructionConstrol<ConstructionControlValue<Date>> = new ConstructionConstrol(null, [(x: ConstructionConstrol<ConstructionControlValue<Date>>) => x.value && x.value.constructed ? null : { 'required': null }]);
  private bsMeasureControl: ConstructionConstrol<ConstructionControlValue<number>> = new ConstructionConstrol(null);
  private simpleFoodBolusControl: ConstructionConstrol<ConstructionControlValue<SimpleInsulinIntake>> = new ConstructionConstrol(null);
  private intervallFoodBolusControl: ConstructionConstrol<ConstructionControlValue<IntervallInsulinIntake>> = new ConstructionConstrol(null);
  private correctionFoodBolusControl: ConstructionConstrol<ConstructionControlValue<SimpleInsulinIntake>> = new ConstructionConstrol(null);
  private foodIntakeListPicker: ConstructionConstrol<ConstructionControlValue<Array<FoodIntakeAttribute>>> = new ConstructionConstrol(null);

  //MISC:
  currentTimestamp: BehaviorSubject<Date> = new BehaviorSubject(null);
  selectedNormalBolus: BehaviorSubject<number> = new BehaviorSubject(null);
  minusBolus: BehaviorSubject<number> = new BehaviorSubject(null);
  foodIntakes: Subject<FoodIntakeAttribute[]> = new BehaviorSubject([]);
  currentBS: Subject<number> = new BehaviorSubject(null);
  loading = true;
  @ViewChild("stepper", { static: false }) private stepper: MatStepper;
  currentSelectedDiary$: Observable<string>;
  entryInModification: Entry = new Entry(null);

  constructor(
    private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private settings: SettingsService,
    private closer: FullScreenModalCloser,
    private store: Store<any>,
    private navUtil: NavUtil,
    private saver: SaverTestService,
    private diaryNav: DiaryNavigationService,
    private deepNav: DepthNavigationService,
    @Inject("IBolusUtilDao") private bolusDao: IBolusUtilDao
  ) {
    this.currentSelectedDiary$ = diaryNav.currentDiaryId$;
  }

  private handleSubFormSubsciptions() {
    FormUtil.getImmediateObservableFromRawControl(this.mainFormGroup).pipe(delay(0)).subscribe(x => {
      this.entryInModification = new Entry(null);
      this.entryInModification.foodIntakes = this.foodIntakeListPicker.value.constructed;
      let insulinIntake: Array<InsulinAttribute> = [];
      if (this.simpleFoodBolusControl.value.constructed) {
        insulinIntake.push(this.simpleFoodBolusControl.value.constructed);
      }
      if (this.intervallFoodBolusControl.value.constructed) {
        insulinIntake.push(this.intervallFoodBolusControl.value.constructed);
      }
      if (this.correctionFoodBolusControl.value.constructed) {
        insulinIntake.push(this.correctionFoodBolusControl.value.constructed);
      }
      this.entryInModification.insulinIntakes = insulinIntake;
      this.entryInModification.bloodSuger = this.bsMeasureControl.value.constructed;
      this.entryInModification.timeStamp = this.timeStampControl.value.constructed;
      console.log("NEW ENTRY: " + JSON.stringify(this.entryInModification));
      console.log("FFOORRMM: " + JSON.stringify(this.mainFormGroup.value));
    });
    FormUtil.getImmediateObservable(this.timeStampControl).subscribe(x => this.currentTimestamp.next(x));
    FormUtil.getImmediateObservable(this.simpleFoodBolusControl).subscribe(x => this.selectedNormalBolus.next(x ? x.units : null));
    FormUtil.getImmediateObservable(this.foodIntakeListPicker).subscribe(x => this.foodIntakes.next(x));
    FormUtil.getImmediateObservable(this.bsMeasureControl).subscribe(x => this.currentBS.next(x));
  }

  ngAfterViewInit(): void {
    this.handleFragmentNavigationStuff();
  }

  ngOnInit() {
    FormUtil.waitForInitialization(this.timeStampControl, this.foodIntakeListPicker, this.bsMeasureControl, this.simpleFoodBolusControl, this.intervallFoodBolusControl, this.correctionFoodBolusControl).subscribe(x => this.handleSubFormSubsciptions());
    this.initializeForms();
    let action = AddIngestionActions.OPENED(new ExtendedAction(this));
    this.store.dispatch(action);
    action.then(x => this.loading = false);
    if (this.deepNav.recoverData) {
      this.mainFormGroup.setValue(this.deepNav.recoverData);
    }
  }

  get isLastStep(): boolean {
    return this.stepper ? this.stepper.selectedIndex + 1 === this.stepper.steps.length : false;
  }
  get currentStep(): number {
    return this.stepper ? this.stepper.selectedIndex : 0;
  }

  private handleFragmentNavigationStuff() {
    setTimeout(x => this.navUtil.synchroniceFragmentNavigation(this.stepper));
  }

  private initializeForms(): void {
    this.firstFormGroup = this.fb.group({
      timestamp: this.timeStampControl,
      bsMeasure: this.bsMeasureControl
    });
    this.secondFormGroup = this.fb.group({
      foodIntakeListPicker: this.foodIntakeListPicker
    });
    this.thirdFormGroup = this.fb.group({
      simpleFoodBolusControl: this.simpleFoodBolusControl,
      intervallFoodBolus: this.intervallFoodBolusControl,
      correctionFoodBolusControl: this.correctionFoodBolusControl
    });
    this.mainFormGroup = this.fb.group({ timeAndBs: this.firstFormGroup, mealForm: this.secondFormGroup, bolusEtc: this.thirdFormGroup });
    this.mainFormGroup.setValidators([CustomValidators.complexRequiredFactory([this.timeStampControl],
      [this.simpleFoodBolusControl,this.correctionFoodBolusControl,this.intervallFoodBolusControl, this.bsMeasureControl, this.foodIntakeListPicker])
    ]);
  }

  submit() {
    if (this.mainFormGroup.valid) {
      let action = new AddEntryActionsProps(this, this.entryInModification);
      this.store.dispatch(AddIngestionActions.CONFIRM(action));
      this.loading = true;
      action.then(x => this.closer.close()).catch(err => {
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es päter erneut");
        this.closer.close();
      })
    }
  }

  onMinusBolus($event) {
    this.minusBolus.next($event);
  }

  onBolusRequest() {
    this.loading = true;
    this.bolusDao.getBolusSuggestion(this.entryInModification).subscribe(x => {
      setTimeout(() => {
        this.correctionFoodBolusControl.reset();
        let intake = x.insulinIntakes.find(x => x.semanticIdentifier === BaseInsulinIntakeSemantics.CORRECTION_BOLUS && x instanceof SimpleInsulinIntake);
        if (intake) {
          this.correctionFoodBolusControl.setValue(new ConstructionControlValue(null, intake));
        }
      });
      setTimeout(() => {
        this.simpleFoodBolusControl.reset(null, { emitEvent: false });
        let intake = x.insulinIntakes.find(x => x.semanticIdentifier === BaseInsulinIntakeSemantics.FOOD_BOLUS && x instanceof SimpleInsulinIntake);
        if (intake) {
          this.simpleFoodBolusControl.setValue(new ConstructionControlValue(null, intake));
        }
      });
      this.loading = false;
    }, err => { alert(err); this.loading = false; });

  }

  compare() {
    this.deepNav.goDeep(this.mainFormGroup.value);
  }

  ngOnDestroy(): void {
    //this.saver.save = this.thirdFormGroup.value;
  }
}
