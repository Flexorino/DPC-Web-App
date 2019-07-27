import { PageTitleResolver } from './../shared/guards/page-title-resolver';
import { BaseNavComponent } from './components/base-nav/base-nav.component';
import { DiaryHeaderExtensionComponent } from './diary/diary-header-extension/diary-header-extension.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryOverviewComponent } from './diary/components/diary-overview/diary-overview.component';
import { DiaryNavComponent } from './diary/diary-nav/diary-nav.component';
import { DiaryStatisticsComponent } from './diary/components/diary-statistics/diary-statistics.component';
import { DiaryListComponent } from './diary/components/diary-list/diary-list.component';


const routes: Routes = [
  {
    path: "", component: BaseNavComponent, children: [{
      path: "diary", children: [
        { path: "", component: DiaryHeaderExtensionComponent, outlet: "base-nav-extension" },
        {
          path: ":diary-id", component: DiaryNavComponent, children: [
            { path: "", redirectTo: "overview", pathMatch: 'full' },
            { path: "overview", component: DiaryOverviewComponent,resolve: {null: PageTitleResolver}, data:{title: "Übersicht"}  },
            { path: "statistics", component: DiaryStatisticsComponent, resolve: {null: PageTitleResolver}, data:{title: "Statistik"} },
            { path: "list", component: DiaryListComponent, resolve: {null: PageTitleResolver}, data:{title: "Listen-Ansicht"} }]
        }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
