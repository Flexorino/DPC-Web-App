import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Pipe({
  name: 'carbs'
})
export class CarbsPipe implements PipeTransform {


  constructor(private settings: SettingsService) {

  }

  transform(value: number, ...args: any[]): String {
    return (this.settings.getCarbsFactor() * value).toFixed(0) + " KE";
  }

}
