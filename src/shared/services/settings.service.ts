import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public defaultCorrectionInsulin = '1';
  public defaultMealInsulin = '1';
  public defaultBasalInsulin = '1';

  public getBSUnit(): string {
    return 'mg/dl';
  }

 
  getCarbsFactor() {
    return 1 / 10;
  }
}
