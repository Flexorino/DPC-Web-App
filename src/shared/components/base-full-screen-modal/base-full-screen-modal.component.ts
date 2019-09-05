import { DepthNavigationService } from './../../services/depth-navigation.service';
import { FullScreenModalCloser } from './full_screen_closer.service';
import { CurrentDiaryViewSerivce } from './../../../app/diary/services/CurrentDiaryView.service';
import { ModalCallbackService } from './../../../app/diary/services/view-moadl-callback.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiaryNavigationService } from 'src/shared/services/diary.navigation.service';
import { NavUtil } from 'src/shared/util/navigation.util';

@Component({
  selector: 'app-base-full-screen-modal',
  templateUrl: './base-full-screen-modal.component.html',
  styleUrls: ['./base-full-screen-modal.component.scss'],
  providers: [FullScreenModalCloser]
})
export class BaseFullScreenModalComponent implements OnInit {

  constructor(private callBackService: ModalCallbackService, private router: Router, private currentDiaryService: DiaryNavigationService, private closer: FullScreenModalCloser, private deepNav : DepthNavigationService, private navUtil : NavUtil) {
    closer.closeSubject.subscribe(() => this.close());
  }

  ngOnInit() {
  }

  close(){
    this.deepNav.back(this.navUtil.defaultNavigationRoute);
  }

}
