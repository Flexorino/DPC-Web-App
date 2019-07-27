import { EntryService } from './../../../../shared/services/entry.service';
import { EintrgeService } from './../../../../web-api/api/eintrge.service';
import { EntryAttributeTypes } from './../../../../shared/model/diary/entry/entry-attribute-types';
import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { BaseEntryAttribute } from 'src/shared/model/diary/entry/base-entry-attribute';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnInit {
  ngOnInit(): void {
    this.entryService.getEntries("2").subscribe(x => this.dayMappedEntries = this.entryService.mapEntriesToDays(x));
  }

  constructor(private entryService: EntryService) { }
  public dayMappedEntries = [];

  public graphViewActivated = false;


}
