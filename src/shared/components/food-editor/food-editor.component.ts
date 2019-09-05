import { Absorption } from './../../model/diary/food';
import { BSUnit } from 'src/shared/services/BSUnit';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { IEntryFoodPicker } from '../interfaces/IEntryFoodPicker';
import { Food } from 'src/shared/model/diary/food';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from 'src/shared/services/settings.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-food-editor',
  templateUrl: './food-editor.component.html',
  styleUrls: ['./food-editor.component.scss']
})
export class FoodEditorComponent implements OnInit, IEntryFoodPicker {
  food: BehaviorSubject<Food> = new BehaviorSubject(null);
  @Input("form") form: FormGroup = new FormGroup({});
  @Input("preselected") preselected: Food;
  foodInModification: Food = new Food(null);


  constructor(private fb: FormBuilder, private settings: SettingsService) { }

  ngOnInit() {
    console.log("INPUT " + JSON.stringify(this.preselected));
    let name: string = null;
    let carbsFactor: number = null;
    let resorption: string = null;
    let description: string = null;
    if (this.preselected) {
      this.foodInModification = this.preselected;
      name = this.preselected.name;
      carbsFactor = this.preselected.carbsFactor? this.preselected.carbsFactor * 100 : null;
      resorption = this.preselected.absorption === Absorption.FAST ? "f" : this.preselected.absorption === Absorption.MEDIUM ? "m" : this.preselected.absorption === Absorption.SLOW ? "s" : null;
      description = this.preselected.description;
    }
    let nameControl: FormControl = this.fb.control(name, [Validators.maxLength(30)]);
    let carbsFactorControl: FormControl = this.fb.control(carbsFactor, [Validators.max(100), Validators.min(1)]);
    let resorptionControl: FormControl = this.fb.control(resorption, [Validators.max(100), Validators.min(1)]);
    let descriptionControl: FormControl = this.fb.control(description, [Validators.max(3780), Validators.min(1)]);
    this.form.addControl("name", nameControl);
    this.form.addControl("carbsFactor", carbsFactorControl);
    this.form.addControl("resorption", resorptionControl);
    this.form.addControl("description", descriptionControl);
    this.form.setValidators([x => (nameControl.value || carbsFactorControl.value || resorptionControl.value || descriptionControl.value) ? null : { "atLeastOneField": {} }]);
    this.form.valueChanges.pipe(delay(0)).subscribe(x => {
      this.foodInModification.name = nameControl.value ? nameControl.value : null;
      try {
        this.foodInModification.carbsFactor = carbsFactorControl.value ? Number.parseFloat(carbsFactorControl.value) * 0.01 : null;
      } catch (e) {
      }
      this.foodInModification.absorption = resorptionControl.value ? resorptionControl.value === 's' ? Absorption.SLOW : resorptionControl.value === 'm' ? Absorption.MEDIUM : Absorption.FAST : null;
      this.foodInModification.description = descriptionControl.value ? descriptionControl.value : null;
      this.food.next(this.foodInModification);
    });
  }

  init(){
    
  }

}
