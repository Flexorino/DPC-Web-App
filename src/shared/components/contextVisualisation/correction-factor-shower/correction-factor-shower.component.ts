import { SettingsService } from 'src/shared/services/settings.service';
import { BSUnit } from 'src/shared/services/BSUnit';
import { DiaryCorrectionFactors } from './../../../model/diary/context/diary-correction-factors';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Diary } from 'src/shared/model/diary/diary';
import { getLatestContextObservable } from '../selectors';
import { DiaryContext } from 'src/shared/model/diary/context/diary-context';

@Component({
  selector: 'app-correction-factor-shower',
  templateUrl: './correction-factor-shower.component.html',
  styleUrls: ['./correction-factor-shower.component.scss']
})
export class CorrectionFactorShowerComponent implements OnInit {

  @Input("currentTimestamp") currentTimestamp: Observable<Date>;


  currentCorrectionFactorAttribut: DiaryCorrectionFactors = null;
  bsunit: BSUnit;
  constructor(
    private store: Store<{ diary: Diary }>, private settings: SettingsService
  ) {
  }

  ngOnInit() {
    getLatestContextObservable(this.currentTimestamp, this.store).subscribe((x: DiaryContext) => {
      x ? this.currentCorrectionFactorAttribut = x.correctionFactors : this.currentCorrectionFactorAttribut = null;
    });
    this.bsunit = this.settings.bsUnitSettingSubj.getValue();
  }
}
