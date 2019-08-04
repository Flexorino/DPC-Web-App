import { map } from 'rxjs/operators';
import { User } from './../../../../shared/model/user/user';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { CollViewActions } from './coll-view.actions';
import { Component, OnInit } from '@angular/core';
import { DiaryNavigationService } from 'src/shared/services/diary.navigation.service';
import { Store, select } from '@ngrx/store';
import { DiaryReference } from 'src/shared/model/user/diary-reference';

@Component({
  selector: 'app-coll-view',
  templateUrl: './coll-view.component.html',
  styleUrls: ['./coll-view.component.scss']
})
export class CollViewComponent implements OnInit {

  public currentDiary: string;
  public test;
  public myDiaries : Array<DiaryReference>;


  constructor(private diarySelectionService: DiaryNavigationService, private store: Store<{ user: User }>) {
    store.pipe(select("user"),map(user => JSON.stringify(user))).subscribe(x => this.test = x);
    store.pipe(select("user")).subscribe((x : User ) => {
      this.myDiaries = x.myDiaries;});
    }

  switchDiary() {
    this.diarySelectionService.setCurrentDiary(this.currentDiary);
  }

  ngOnInit() {
    this.store.dispatch(CollViewActions.OPENED(new CompletableAction(this)));
  }

}
