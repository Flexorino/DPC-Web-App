
import { state } from '@angular/animations';
import { CallBackGuard } from './diary/services/callback-guard';

import { BaseFullScreenModalComponent } from './../shared/components/base-full-screen-modal/base-full-screen-modal.component';
import { CollViewComponent } from './configs/component/coll-view/coll-view.component';
import { PageTitleResolver } from './../shared/guards/page-title-resolver';
import { CanActivateDiaryViewGuard } from './../shared/guards/can-activate-diary-view.guard';
import { BaseNavComponent } from './components/base-nav/base-nav.component';
import { DiaryHeaderExtensionComponent } from './diary/diary-header-extension/diary-header-extension.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryOverviewComponent } from './diary/components/diary-overview/diary-overview.component';
import { DiaryNavComponent } from './diary/diary-nav/diary-nav.component';
import { DiaryStatisticsComponent } from './diary/components/diary-statistics/diary-statistics.component';
import { DiaryListComponent } from './diary/components/diary-list/diary-list.component';
import { AddOverviewComponent } from './diary/components/add-overview/add-overview.component';
import { AddIngestionComponent } from './diary/components/add-entry-components/add-ingestion/add-ingestion.component';
import { ManualEntryAddComponent } from './diary/components/add-entry-components/manual-entry-add/manual-entry-add.component';
import { AddBSMeasureComponent } from './diary/components/add-entry-components/add-bsmeasure/add-bsmeasure.component';
import { SearchViewComponent } from './diary/components/search-view/search-view.component';



const routes: Routes = [
  { path: "", component: BaseNavComponent, outlet: 'test' },

  {
    path: "", component: BaseNavComponent, children: [{
      path: "diary", children: [
        { path: "", component: DiaryHeaderExtensionComponent, outlet: "base-nav-extension" },
        {
          path: ":diary-id", canActivateChild: [CanActivateDiaryViewGuard], component: DiaryNavComponent, children: [
            { path: "", redirectTo: "overview", pathMatch: 'full' },
            { path: "overview", component: DiaryOverviewComponent, resolve: { null: PageTitleResolver }, data: { title: "Übersicht" } },
            { path: "statistics", component: DiaryStatisticsComponent, resolve: { null: PageTitleResolver }, data: { title: "Statistik" } },
            { path: "list", component: DiaryListComponent, resolve: { null: PageTitleResolver }, data: { title: "Listenansicht" } },
          ]
        }
      ]
    },
    {
      path: "diary-collaboration-settings", component: CollViewComponent, resolve: { null: PageTitleResolver }, data: { title: "Tagebücher-Verwaltung" }
    }
    ]
  },
  {
    path: "", component: BaseFullScreenModalComponent, children: [
      {
        path: "diary", children: [
          {
            path: ":diary-id", canActivateChild: [CanActivateDiaryViewGuard], children: [
              {
                path: "add", children: [
                  { path: "", pathMatch: "full", redirectTo: "overview" },
                  { path: "overview", component: AddOverviewComponent, resolve: { null: PageTitleResolver }, data: { title: "Eintrag hinzufügen" } },
                  { path: "ingestion", component: AddIngestionComponent, resolve: { null: PageTitleResolver }, data: { title: "Nahrungsaufnahme hinzufügen" } },
                  { path: "custom", component: ManualEntryAddComponent, resolve: { null: PageTitleResolver }, data: { title: "benutzerdefinierte Eingabe" } },
                  { path: "blood-sugar", component: AddBSMeasureComponent, resolve: { null: PageTitleResolver }, data: { title: "Blutzuckermessung" } }
                ]
              },
              {path: "search", component: SearchViewComponent, resolve: { null: PageTitleResolver }, data: { title: "Suchen" }}
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
