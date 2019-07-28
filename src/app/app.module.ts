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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
import { MatCardModule } from '@angular/material/card';
import { AddEntryComponent } from './diary/components/add-entry/add-entry.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { EffectsModule } from '@ngrx/effects';
import { DiaryEffects } from 'src/shared/effects/entries-effects';
import { StoreModule } from '@ngrx/store';
import { diaryReducer } from 'src/shared/model/redux/Diary';

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
    AddEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ApiModule.forRoot(() => new Configuration({ basePath: "http://localhost:8088" })),
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    StoreModule.forRoot({ diary: diaryReducer }),
    EffectsModule.forRoot([DiaryEffects])

  ],
  providers: [BloodSugarPipe, CarbsPipe],
  bootstrap: [AppComponent],
  entryComponents: [AddEntryComponent]
})
export class AppModule { }
