import { CompletableActionWithData } from './../../../../shared/actions/CompletableActionWitHData';
import { AddDiaryFormInfo } from './../../../components/diary-name-pop-up/diary-name-pop-up.component';

import { MatDialog } from '@angular/material/dialog';
import { map, take } from 'rxjs/operators';
import { User } from './../../../../shared/model/user/user';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { CollViewActions } from './coll-view.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiaryNavigationService } from 'src/shared/services/diary.navigation.service';
import { Store, select } from '@ngrx/store';
import { DiaryReference } from 'src/shared/model/user/diary-reference';
import { Grant } from 'src/shared/model/user/grant';
import { Subscription } from 'rxjs';
import { DiaryNamePopUpComponent } from 'src/app/components/diary-name-pop-up/diary-name-pop-up.component';

@Component({
  selector: 'app-coll-view',
  templateUrl: './coll-view.component.html',
  styleUrls: ['./coll-view.component.scss']
})
export class CollViewComponent implements OnInit, OnDestroy {

  public currentDiary: string;
  public test;
  public myDiaries: Array<DiaryReference>;
  public myGrants: Array<Grant>;
  private userSubscription: Subscription;
  public loading = true;

  constructor(public diarySelectionService: DiaryNavigationService, private store: Store<{ user: User }>, private matDialog: MatDialog) {

  }

  switchDiary(id: string) {
    this.diarySelectionService.currentDiaryId$.getValue();
    this.diarySelectionService.setCurrentDiary(id);
  }

  ngOnInit() {
    let action = CollViewActions.OPENED(new CompletableAction(this));
    this.store.dispatch(action);
    action.then(x => this.loading = false);
    this.userSubscription = this.store.pipe(select("user")).subscribe((x: User) => {
      this.myGrants = x.grants;
      this.myDiaries = x.myDiaries;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  addDiary() {
    this.matDialog.open(DiaryNamePopUpComponent).afterClosed().pipe(take(1)).subscribe((info: AddDiaryFormInfo) => {
      if (info) {
        this.loading = true;
        let action = CollViewActions.DIARY_ADDED(new CompletableActionWithData(this, { name: info.name }));
        this.store.dispatch(action);
        action.then(x => this.loading = false);
      }
    });
  }

}
