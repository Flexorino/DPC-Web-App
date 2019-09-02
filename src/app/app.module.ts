
import { AddEntryFoodSelectionDecider } from './diary/components/add-entry-components/inputs/components/add-entry-food-selection-decider/add-entry-food-selection-decider.component';
import { AddEnetryFoodIntakeListPicker } from './diary/components/add-entry-components/inputs/components/add-entry-food-intake-list-picker/add-entry-food-intake-list-picker.component';
import { AddEntryBSPicker } from './diary/components/add-entry-components/inputs/components/add-entry-bs-picker/add-entry-bs-picker.component';


import { BASE_PATH } from './../web-api/variables';
import { ApiModule } from './../web-api/api.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiaryNavComponent } from './diary/diary-nav/diary-nav.component';
import { BaseNavComponent } from './components/base-nav/base-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DiaryStatisticsComponent } from './diary/components/diary-statistics/diary-statistics.component';
import { DiaryHeaderExtensionComponent } from './diary/diary-header-extension/diary-header-extension.component';
import { DiaryListComponent } from './diary/components/diary-list/diary-list.component';
import { DiaryOverviewComponent } from './diary/components/diary-overview/diary-overview.component';
import { Configuration } from 'src/web-api';
import { HttpClientModule } from '@angular/common/http';
import { BloodSugarPipe } from 'src/shared/pipes/blood-sugar.pipe';
import { BSTendencyPipe } from 'src/shared/pipes/bstendency.pipe';
import { BSEvaluationPipePipe } from 'src/shared/pipes/bsevaluation-pipe.pipe';
import { CarbsPipe } from 'src/shared/pipes/carbs.pipe';
import { CustomTimePipe } from 'src/shared/pipes/custom-time.pipe';
import { EntryMainValueDisplayPipe } from 'src/shared/pipes/entry-main-value-display.pipe';
import { EffectsModule } from '@ngrx/effects';
import { DiaryEffects } from 'src/shared/effects/entries-effects';
import { StoreModule } from '@ngrx/store';
import { diaryReducer } from 'src/shared/model/redux/Diary';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEntryComponent } from './diary/components/add-entry-components/add-entry/add-entry.component';
import { MaterialModule } from './material-module';
import { CollViewComponent } from './configs/component/coll-view/coll-view.component';
import { UserEffects } from 'src/shared/effects/user-effects';
import { userReducer } from 'src/shared/model/redux/user-reducer';
import { BaseFullScreenModalComponent } from 'src/shared/components/base-full-screen-modal/base-full-screen-modal.component';
import { AddOverviewComponent } from './diary/components/add-overview/add-overview.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AddIngestionEffects } from 'src/shared/effects/add-ingestion-effects';
import { AddIngestionComponent } from './diary/components/add-entry-components/add-ingestion/add-ingestion.component';
import { AddEntryTimestampPickerComponent } from './diary/components/add-entry-components/inputs/components/add-entry-timestamp-picker/add-entry-timestamp-picker.component';
import { FoodIntakeSummationComponent } from './diary/components/add-entry-components/misc/food-intake-summation/food-intake-summation.component';
import { ListFoodPickerComponent } from 'src/shared/components/list-food-picker/list-food-picker.component';
import { FoodEditorComponent } from 'src/shared/components/food-editor/food-editor.component';
import { AddEntryFoodIntakePicker } from './diary/components/add-entry-components/inputs/components/add-entry-food-intake-picker/add-entry-food-intake-picker.component';
import { FoodInfoShowerComponent } from '../shared/components/food-info-shower/food-info-shower.component';
import { FoodInfoShowerPopupwrapperComponent } from 'src/shared/components/food-info-shower-popupwrapper/food-info-shower-popupwrapper.component';
import { AddEntryIntervallFoodBolusPickerComponent } from './diary/components/add-entry-components/inputs/components/add-entry-intervall-food-bolus-picker/add-entry-intervall-food-bolus-picker.component';
import { AddEntrySimpleCorrectionBolusPickerComponent } from './diary/components/add-entry-components/inputs/components/add-entry-simple-correction-bolus-picker/add-entry-simple-correction-bolus-picker.component';
import { KeFactorShowerComponent } from '../shared/components/contextVisualisation/ke-factor-shower/ke-factor-shower.component';
import { CorrectionFactorShowerComponent } from '../shared/components/contextVisualisation/correction-factor-shower/correction-factor-shower.component';
import { FramevalueShowerComponent } from '../shared/components/contextVisualisation/framevalue-shower/framevalue-shower.component';
import { BolusCalculatorButtonComponent } from './diary/components/add-entry-components/misc/bolus-calculator-button/bolus-calculator-button.component';
import { RestNetworkBolusUtilDAO } from 'src/shared/services/DAO/network-bolus-util-dao';
import { AddEntrySimpleFoodBolusPickerComponent } from './diary/components/add-entry-components/inputs/components/add-entry-simple-food-bolus-picker/add-entry-simple-food-bolus-picker.component';
import { ManualEntryAddComponent } from './diary/components/add-entry-components/manual-entry-add/manual-entry-add.component';
import { AddBSMeasureComponent } from './diary/components/add-entry-components/add-bsmeasure/add-bsmeasure.component';
import { AddEntryBSMeasureEntryComponent } from './diary/components/add-entry-components/inputs/components/add-entry-bsmeasure-entry/add-entry-bsmeasure-entry.component';
import { SearchViewComponent } from './diary/components/search-view/search-view.component';
import { AddBSEffects } from 'src/shared/effects/add-bs-effects';
import { BSRatingViewComponent } from './diary/components/add-entry-components/misc/bsrating-view/bsrating-view.component';
import { FastKEInputComponent } from './diary/components/add-entry-components/inputs/components/fast-keinput/fast-keinput.component';


@NgModule({
  declarations: [
    AppComponent,
    DiaryNavComponent,
    BaseNavComponent,
    DiaryStatisticsComponent,
    DiaryHeaderExtensionComponent,
    DiaryListComponent,
    DiaryOverviewComponent,
    CarbsPipe,
    EntryMainValueDisplayPipe,
    BSEvaluationPipePipe,
    CustomTimePipe,
    BSTendencyPipe,
    BloodSugarPipe,
    AddEntryComponent,
    CollViewComponent,
    BaseFullScreenModalComponent,
    AddOverviewComponent,
    AddIngestionComponent,
    AddEntryFoodIntakePicker,
    AddEntryFoodSelectionDecider,
    AddEntryTimestampPickerComponent,
    AddEntryBSPicker,
    AddEnetryFoodIntakeListPicker,
    FoodIntakeSummationComponent,
    ListFoodPickerComponent,
    FoodEditorComponent,
    FoodInfoShowerComponent,
    FoodInfoShowerPopupwrapperComponent,
    AddEntrySimpleFoodBolusPickerComponent,
    AddEntryIntervallFoodBolusPickerComponent,
    AddEntrySimpleCorrectionBolusPickerComponent,
    KeFactorShowerComponent,
    CorrectionFactorShowerComponent,
    FramevalueShowerComponent,
    BolusCalculatorButtonComponent,
    ManualEntryAddComponent,
    AddBSMeasureComponent,
    AddEntryBSMeasureEntryComponent,
    SearchViewComponent,
    BSRatingViewComponent,
    FastKEInputComponent  
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ApiModule.forRoot(() => new Configuration({ basePath: "http://localhost:8889" })),
    HttpClientModule,
    StoreModule.forRoot({ diary: diaryReducer, user: userReducer }),
    EffectsModule.forRoot([DiaryEffects, UserEffects, AddIngestionEffects, AddBSEffects]),
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule

  ],
  providers: [BloodSugarPipe, CarbsPipe,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, {provide: 'IBolusUtilDao', useClass: RestNetworkBolusUtilDAO}],
  bootstrap: [AppComponent],
  entryComponents: [AddEntryComponent, AddEntryFoodSelectionDecider, FoodInfoShowerPopupwrapperComponent]
})
export class AppModule { }
