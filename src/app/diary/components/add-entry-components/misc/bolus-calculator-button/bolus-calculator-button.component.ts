import { Entry } from 'src/shared/model/diary/entry/entry';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-bolus-calculator-button',
  templateUrl: './bolus-calculator-button.component.html',
  styleUrls: ['./bolus-calculator-button.component.scss']
})
export class BolusCalculatorButtonComponent implements OnInit {

  constructor() { }

  @Input("validation") validation = false;
  @Output("onCalculateRequest") onCalculateRequest = new EventEmitter<void>();

  ngOnInit() {
  }

  click(){
    this.onCalculateRequest.next(null);
  }

}
