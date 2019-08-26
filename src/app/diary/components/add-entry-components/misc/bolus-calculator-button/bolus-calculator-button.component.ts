import { Entry } from 'src/shared/model/diary/entry/entry';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bolus-calculator-button',
  templateUrl: './bolus-calculator-button.component.html',
  styleUrls: ['./bolus-calculator-button.component.scss']
})
export class BolusCalculatorButtonComponent implements OnInit {

  constructor() { }

  @Input("validation") validation = false;
  @Input("entry") entry: Entry;

  ngOnInit() {
  }

}
