import { EntryAttributeTypes } from './../../../../shared/model/diary/entry/entry-attribute-types';
import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/shared/model/diary/entry/entry';
import { BaseEntryAttribute } from 'src/shared/model/diary/entry/base-entry-attribute';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent {

  constructor() { }
  public dayMappedEntries = [
    {
      day: 1563573600, entries: [new Entry(1563620244, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563624424, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563635224, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563649624, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)])
      ]
    },
    {
      day: 1563487200, entries: [new Entry(1563620244, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563624424, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563635224, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563649624, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)])
      ]
    }
    ,
    {
      day: 1563486800, entries: [new Entry(1563620244, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563624424, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563635224, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563649624, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)])
      ]
    },
    {
      day: 1563486400, entries: [new Entry(1563620244, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563624424, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563635224, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)]),
      new Entry(1563649624, [new BaseEntryAttribute(EntryAttributeTypes.BS_MEASURE, 6), new BaseEntryAttribute(EntryAttributeTypes.MEAL_UNITS, 6)])
      ]
    }

  ]

  public graphViewActivated = true;


}
