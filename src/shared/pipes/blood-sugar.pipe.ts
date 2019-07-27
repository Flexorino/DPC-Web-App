import { SettingsService } from './../services/settings.service';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'BloodSugarPipe'
})
export class BloodSugarPipe implements PipeTransform {

  constructor(private settings: SettingsService) {

  }

  transform(molValue: number): string {
    if (this.settings.getBSUnit() === 'mg/dl') {
      return (molValue * 18.02).toFixed(1) + " mg/dl";
    }
    return molValue.toFixed(2) + " mmol/l";
  }

}
