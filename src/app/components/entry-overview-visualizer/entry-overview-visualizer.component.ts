import { IntervallInsulinIntake } from './../../../shared/model/diary/entry/attributes/intervall-insulin-intake';
import { BaseInsulinIntakeSemantics, InsulinAttribute } from 'src/shared/model/diary/entry/attributes/insulin-attribute';
import { BSUnit } from 'src/shared/services/BSUnit';
import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { SettingsService } from 'src/shared/services/settings.service';
import * as d3 from "d3";

@Component({
  selector: 'app-entry-overview-visualizer',
  templateUrl: './entry-overview-visualizer.component.html',
  styleUrls: ['./entry-overview-visualizer.component.scss']
})
export class EntryOverviewVisualizerComponent implements OnInit {

  @Input("entry") entry: Entry;
  public bsUnit: BSUnit;
  public keFactor: number;

  public insulinIntakes: Array<{ ie: number, semantic: string }> = [];

  public foodOverView: { name: string, amount: number, more: boolean } = null;

  get json() {
    return JSON.stringify(this.insulinIntakes);
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
    if (this.entry.insulinIntakes && this.entry.insulinIntakes.length) {
      let intakesBySemantic: Array<{ key: any, values: Array<InsulinAttribute> }> = d3.nest().key(function (d: InsulinAttribute) { return d.semanticIdentifier }).entries(this.entry.insulinIntakes);
      intakesBySemantic.forEach(x => {
        let text = x.key == BaseInsulinIntakeSemantics.FOOD_BOLUS ? "Essen" : BaseInsulinIntakeSemantics.CORRECTION_BOLUS ? "Korr." : "Basal";
        this.insulinIntakes.push({ ie: x.values.map(x => x.units).reduce((x, y) => x + y), semantic: text })
      });
    }
  }

}
