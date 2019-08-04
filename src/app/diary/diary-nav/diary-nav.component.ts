import { DiaryNavigationService } from './../../../shared/services/diary.navigation.service';
import { Subscription } from 'rxjs';
import { PageTitleService } from './../../../shared/services/title.service';
import { DiaryNavActions } from './diary-nav.actions';
import { AddEntryComponent } from './../components/add-entry/add-entry.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-diary-nav',
  templateUrl: './diary-nav.component.html',
  styleUrls: ['./diary-nav.component.scss']
})
export class DiaryNavComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if(this.navigationSubscription){
      this.navigationSubscription.unsubscribe();
    }
  }
  
  public currentSelectedDiary$;

  constructor(public dialog: MatDialog,private diaryNavService: DiaryNavigationService, private store: Store<any>, private titelServie: PageTitleService, private router: Router) {
    this.currentSelectedDiary$ = diaryNavService.currentDiaryId$;
   }

  private navigationSubscription :  Subscription;
  private currentSelectedDiaryName = "";

  ngOnInit() {
    this.store.dispatch(DiaryNavActions.OPEN(new CompletableAction(this)));
    this.store.pipe(select('diary')).pipe(select('name')).subscribe(
      x => {
        if (x) {
          this.currentSelectedDiaryName = x;
          this.titelServie.setTitleExtension(x);
        }
      }
    );
    this.navigationSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        if(this.currentSelectedDiaryName) {
          this.titelServie.setTitleExtension(this.currentSelectedDiaryName);
        }
      }
    });
  }

  public openAddEntryDialog() {
    this.dialog.open(AddEntryComponent, { panelClass: 'full_screen_dialog' })
  }
}
