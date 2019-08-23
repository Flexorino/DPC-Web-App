
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
import { MealSelectionComponent } from './diary/components/add-entry-components/meal-selection/meal-selection.component';
import { AddIngestionComponent } from './diary/components/add-entry-components/add-ingestion/add-ingestion.component';
import { FoodPickerComponent } from './diary/components/add-entry-components/food-picker/food-picker.component';
import { AddEntryTimestampPickerComponent } from './diary/components/add-entry-components/inputs/components/add-entry-timestamp-picker/add-entry-timestamp-picker.component';
import { BsAddEntryMeasureInputComponent } from './diary/components/add-entry-components/inputs/components/bs-add-entry-measure-input/bs-add-entry-measure-input.component';
import { AddEntryFoodPickerComponent } from './diary/components/add-entry-components/inputs/components/add-entry-food-picker/add-entry-food-picker.component';


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
    MealSelectionComponent,
    FoodPickerComponent,
    AddEntryTimestampPickerComponent,
    BsAddEntryMeasureInputComponent,
    AddEntryFoodPickerComponent  
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
    EffectsModule.forRoot([DiaryEffects, UserEffects, AddIngestionEffects]),
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule

  ],
  providers: [BloodSugarPipe, CarbsPipe,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent],
  entryComponents: [AddEntryComponent, FoodPickerComponent]
})
export class AppModule { }
