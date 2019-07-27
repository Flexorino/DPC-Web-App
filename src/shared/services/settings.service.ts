import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getBSUnit(): string {
    return 'mg/dl';
  }

 
  getCarbsFactor() {
    return 1 / 10;
  }
}
