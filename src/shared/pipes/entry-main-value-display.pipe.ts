import { EntryAttributeTypes } from './../model/diary/entry/entry-attribute-types';
import { CarbsPipe } from './carbs.pipe';
import { BloodSugarPipe } from './blood-sugar.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { EntryAttribute } from '../model/diary/entry/entry-attribute';

@Pipe({
  name: 'entryMainValueDisplay'
})
export class EntryMainValueDisplayPipe implements PipeTransform {

constructor(private bsPipe :BloodSugarPipe, private carbsPipe: CarbsPipe){

}

  transform(value: EntryAttribute, ...args: any[]): any {
    if(value.type===EntryAttributeTypes.BS_MEASURE){
      return this.bsPipe.transform(value.mainValue);
    } else if (value.type===EntryAttributeTypes.MEAL_UNITS){
      return this.carbsPipe.transform(value.mainValue);
    }
  }

}
