import { BSUnits, BSUnit } from './BSUnit';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public defaultCorrectionInsulin = '1';
  public defaultMealInsulin = '1';
  public defaultBasalInsulin = '1';
  public bsUnitSetting : BSUnit = BSUnits.MG_PER_DL;


  public carbsFactor = 1/10;

  public getBSUnit(): string {
    return 'mg/dl';
  }

 
  getCarbsFactor() {
    return 1 / 10;
  }
}
