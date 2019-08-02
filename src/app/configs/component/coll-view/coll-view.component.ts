import { Component, OnInit } from '@angular/core';
import { DiaryNavigationService } from 'src/shared/services/diary.navigation.service';

@Component({
  selector: 'app-coll-view',
  templateUrl: './coll-view.component.html',
  styleUrls: ['./coll-view.component.scss']
})
export class CollViewComponent implements OnInit {

  public currentDiary: string;

  constructor(private diarySelectionService: DiaryNavigationService) {

  }

  switchDiary() {
    this.diarySelectionService.setCurrentDiary(this.currentDiary);
  }

  ngOnInit() {
  }

}
