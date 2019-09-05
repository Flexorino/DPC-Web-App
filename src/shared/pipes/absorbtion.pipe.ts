import { Absorption } from './../model/diary/food';
import { SettingsService } from './../services/settings.service';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'AbsorptionPipe'
})
export class AbsorptionPipe implements PipeTransform {

  transform(en: Absorption): string {
    return (en === Absorption.FAST ? 'schnell':(en === Absorption.MEDIUM? 'mittel' : 'schnell'));
  }

}