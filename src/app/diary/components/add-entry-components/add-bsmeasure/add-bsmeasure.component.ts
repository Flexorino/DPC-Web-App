import { Component, OnInit } from '@angular/core';
import { AddBSMeasreActions } from './add-bsmeasure.actions';
import { CompletableAction } from 'src/shared/actions/CompletableAction';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-bsmeasure',
  templateUrl: './add-bsmeasure.component.html',
  styleUrls: ['./add-bsmeasure.component.scss']
})
export class AddBSMeasureComponent implements OnInit {
  ngOnInit(): void {
  }

}