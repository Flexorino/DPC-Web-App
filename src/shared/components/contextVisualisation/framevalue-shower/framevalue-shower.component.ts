import { DiaryContextFrameValues } from './../../../model/diary/context/diary-context-frame-values';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getLatestContextObservable } from '../selectors';
import { DiaryContext } from 'src/shared/model/diary/context/diary-context';
import { Diary } from 'src/shared/model/diary/diary';
import { SettingsService } from 'src/shared/services/settings.service';
import { BSUnit } from 'src/shared/services/BSUnit';

@Component({
  selector: 'app-framevalue-shower',
  templateUrl: './framevalue-shower.component.html',
  styleUrls: ['./framevalue-shower.component.scss']
})
export class FramevalueShowerComponent implements OnInit {

  @Input("currentTimestamp") currentTimestamp: Observable<Date>;

  currentFrameValues: DiaryContextFrameValues = null;

  bsunit: BSUnit;
  constructor(
    private store: Store<{ diary: Diary }>, private settings: SettingsService
  ) {
  }

  ngOnInit() {
    getLatestContextObservable(this.currentTimestamp, this.store).subscribe((x: DiaryContext) => {
      x ? this.currentFrameValues = x.frameValue : this.currentFrameValues = null;
    });
    this.bsunit = this.settings.bsUnitSettingSubj.getValue();
  }


}
