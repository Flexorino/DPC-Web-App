import { BSUnit } from 'src/shared/services/BSUnit';
import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { SettingsService } from 'src/shared/services/settings.service';

@Component({
  selector: 'app-entry-overview-visualizer',
  templateUrl: './entry-overview-visualizer.component.html',
  styleUrls: ['./entry-overview-visualizer.component.scss']
})
export class EntryOverviewVisualizerComponent implements OnInit {

  @Input("entry") entry: Entry;
  public bsUnit: BSUnit;
  public keFactor: number;

  public foodOverView: { name: string, amount: number, more: boolean } = null;

  get json() {
    return JSON.stringify(this.entry);
  }

  constructor(private setting: SettingsService) {

  }

  ngOnInit() {
    console.log(JSON.stringify(this.entry));
    this.bsUnit = this.setting.bsUnitSettingSubj.getValue();
    this.keFactor = this.setting.carbsFactorSubj.getValue();
    if (this.entry.foodIntakes && this.entry.foodIntakes.length) {
      let first = this.entry.foodIntakes.find(x => x.food != null && x.food.name != null);
      let summKH = this.entry.foodIntakes.map(x => x.amount).reduce((x, y) => x + y);
      this.foodOverView = { more: this.entry.foodIntakes.length > 1, name: first ? first.food.name : null, amount: summKH };
    }
  }

}
