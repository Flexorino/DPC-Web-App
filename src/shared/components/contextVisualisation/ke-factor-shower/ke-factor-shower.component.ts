
;
import { DiaryContextKEFactors } from '../../../model/diary/context/diary-context-KE-factors';

import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Diary } from 'src/shared/model/diary/diary';
import { Observable, merge, combineLatest } from 'rxjs';
import { withLatestFrom, map, filter } from 'rxjs/operators';
import { DiaryContext } from 'src/shared/model/diary/context/diary-context';
import { getLatestContextObservable } from '../selectors';

@Component({
  selector: 'app-ke-factor-shower',
  templateUrl: './ke-factor-shower.component.html',
  styleUrls: ['./ke-factor-shower.component.scss']
})
export class KeFactorShowerComponent implements OnInit {

  @Input("currentTimestamp") currentTimestamp: Observable<number>;

  currentKEFactorAttribut: DiaryContextKEFactors = null;

  constructor(
    private store: Store<{ diary: Diary }>
  ) {
  }

  ngOnInit() {
    getLatestContextObservable(this.currentTimestamp, this.store).subscribe((x:DiaryContext) => {
      this.currentKEFactorAttribut = x.keFactor;
    });
  }

}
