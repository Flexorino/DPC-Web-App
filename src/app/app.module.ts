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
import { OverviewComponent } from './diary/components/overview/overview.component';
import { ListComponent } from './diary/components/list/list.component';
import { DiaryStatisticsComponent } from './diary/components/diary-statistics/diary-statistics.component';
import { DiaryHeaderExtensionComponent } from './diary/diary-header-extension/diary-header-extension.component';
import { DiaryListComponent } from './diary/components/diary-list/diary-list.component';
import { DiaryOverviewComponent } from './diary/components/diary-overview/diary-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    DiaryNavComponent,
    BaseNavComponent,
    OverviewComponent,
    ListComponent,
    DiaryStatisticsComponent,
    DiaryHeaderExtensionComponent,
    DiaryListComponent,
    DiaryOverviewComponent
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
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
