import { BSUnit } from 'src/shared/services/BSUnit';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { IEntryFoodPicker } from '../interfaces/IEntryFoodPicker';
import { Food } from 'src/shared/model/diary/food';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from 'src/shared/services/settings.service';

@Component({
  selector: 'app-food-editor',
  templateUrl: './food-editor.component.html',
  styleUrls: ['./food-editor.component.scss']
})
export class FoodEditorComponent implements OnInit, IEntryFoodPicker {
  food: BehaviorSubject<Food>;
  @Input("form") form: FormGroup;
  @Input("preselected") preselected: Food;
  foodInModification: Food = new Food(null);


  constructor(private fb: FormBuilder, private settings: SettingsService) { }

  ngOnInit() {
    let name: string = null;
    let carbsFactor: number = null;
    let resorption: string = null;
    if (this.preselected) {
      this.foodInModification = this.preselected;
      name = this.preselected.name;
    }
    let nameControl: FormControl = this.fb.control(name, [Validators.maxLength(30)]);
    let carbsFactorControl: FormControl = this.fb.control(carbsFactor, [Validators.max(100), Validators.min(1)]);
    let resorptionControl: FormControl = this.fb.control(carbsFactor, [Validators.max(100), Validators.min(1)]);
    this.form.addControl("name", nameControl);
    this.form.addControl("carbsFactor", carbsFactorControl);
    this.form.addControl("resorption", resorptionControl);
    this.form.setValidators([x => (nameControl.value || carbsFactorControl.value || resorptionControl.value) ? null : { "atLeastOneField": {} }]);
  }

}
