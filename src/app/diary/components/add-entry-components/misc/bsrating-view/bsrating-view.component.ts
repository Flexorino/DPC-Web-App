import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DiaryContextFrameValues } from 'src/shared/model/diary/context/diary-context-frame-values';
import { BSUnit } from 'src/shared/services/BSUnit';
import { Store } from '@ngrx/store';
import { Diary } from 'src/shared/model/diary/diary';
import { SettingsService } from 'src/shared/services/settings.service';
import { getLatestContextObservable } from 'src/shared/components/contextVisualisation/selectors';
import { DiaryContext } from 'src/shared/model/diary/context/diary-context';

@Component({
  selector: 'app-bsrating-view',
  templateUrl: './bsrating-view.component.html',
  styleUrls: ['./bsrating-view.component.scss']
})
export class BSRatingViewComponent implements OnInit {

  @Input("currentTimestamp") currentTimestamp: Observable<Date>;
  @Input("currentBS") currentBS: Observable<number>;

  currentFrameValues: DiaryContextFrameValues = null;
  lastBSValue: number = null;
  lastTimeStamp: Date;

  //MISC
  get hourGoalVal() {
    return this.currentFrameValues.dailyBSGoalValues[this.lastTimeStamp.getHours()];
  }

  get rating(): number {
    let l: number = this.lastBSValue;
    let f = this.currentFrameValues;
    return l < f.hypoglycemiaLimit ? -2 : (l < f.lowerBSLimit ? -1 : (l < f.higherBSLimit ? 0 : (l < f.hyperglycemiaLimit ? 1 : 2)));
  }

  bsunit: BSUnit;
  constructor(
    private store: Store<{ diary: Diary }>, private settings: SettingsService
  ) {
  }

  get showable(): boolean {
    return (this.lastBSValue && this.currentFrameValues !== null);
  }

  ngOnInit() {
    getLatestContextObservable(this.currentTimestamp, this.store).subscribe((x: DiaryContext) => {
      x ? this.currentFrameValues = x.frameValue : this.currentFrameValues = null;
    });
    this.currentTimestamp.subscribe(x => this.lastTimeStamp = x);
    this.bsunit = this.settings.bsUnitSettingSubj.getValue();
    this.currentBS.subscribe(x => this.lastBSValue = x);
  }

}
