import { map } from 'rxjs/operators';
import { User } from './../../../../shared/model/user/user';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { CollViewActions } from './coll-view.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiaryNavigationService } from 'src/shared/services/diary.navigation.service';
import { Store, select } from '@ngrx/store';
import { DiaryReference } from 'src/shared/model/user/diary-reference';
import { Grant } from 'src/shared/model/user/grant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coll-view',
  templateUrl: './coll-view.component.html',
  styleUrls: ['./coll-view.component.scss']
})
export class CollViewComponent implements OnInit, OnDestroy {

  public currentDiary: string;
  public test;
  public myDiaries : Array<DiaryReference>;
  public myGrants : Array<Grant>;
  private userSubscription: Subscription;


  constructor(public diarySelectionService: DiaryNavigationService, private store: Store<{ user: User }>) {

    }

  switchDiary(id: string) {
    this.diarySelectionService.currentDiaryId$.getValue();
    this.diarySelectionService.setCurrentDiary(id);
  }

  ngOnInit() {
    this.store.dispatch(CollViewActions.OPENED(new CompletableAction(this)));
    this.userSubscription = this.store.pipe(select("user")).subscribe((x : User ) => {
      this.myGrants = x.grants;
      this.myDiaries = x.myDiaries;});
  }

  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

}
