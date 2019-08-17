import { CurrentDiaryViewSerivce } from './../../../app/diary/services/CurrentDiaryView.service';
import { ModalCallbackService } from './../../../app/diary/services/view-moadl-callback.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiaryNavigationService } from 'src/shared/services/diary.navigation.service';

@Component({
  selector: 'app-base-full-screen-modal',
  templateUrl: './base-full-screen-modal.component.html',
  styleUrls: ['./base-full-screen-modal.component.scss']
})
export class BaseFullScreenModalComponent implements OnInit {

  constructor(private callBackService: ModalCallbackService, private router: Router, private currentDiaryService : DiaryNavigationService) { }

  ngOnInit() {
  }

  public abort() {
    if(this.callBackService.current !== null){
      this.router.navigateByUrl(this.callBackService.current);
    } else {
      this.router.navigateByUrl("diary/"+this.currentDiaryService.currentDiaryId$.getValue());
    }
  }

}