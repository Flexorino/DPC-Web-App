import { FoodPickerComponent } from './../food-picker/food-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { SettingsService } from 'src/shared/services/settings.service';
import { stringify } from '@angular/compiler/src/util';
import { Patcherino } from 'src/shared/services/patcherino/patcherino';
import { Patch } from 'src/shared/services/patcherino/patch';
import { JJ } from 'src/shared/test';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //  const isSubmitted = form && form.submitted;
    //  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    return control.value ? !control.valid : false;
  }
}

@Component({
  selector: 'app-meal-selection',
  templateUrl: './meal-selection.component.html',
  styleUrls: ['./meal-selection.component.scss']
})
export class MealSelectionComponent implements OnInit {

  mealCalcHelpForm: FormGroup;
  extrasMatcher = new MyErrorStateMatcher();
  carbsFactor;
  @Input('group') formGroup: FormGroup;
  @Output('close') close = new EventEmitter<void>();
  @ViewChild("mealSel", { static: false }) ref: ElementRef;

  constructor(private fb: FormBuilder, private settings: SettingsService, private dialog: MatDialog) {
    this.mealCalcHelpForm = this.fb.group({
      carbsFactor: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.carbsFactor = settings.carbsFactor;
  }

  calculateKE() {
    if (this.mealCalcHelpForm.valid) {

      try {
        let res = Number.parseFloat(this.mealCalcHelpForm.get("amount").value) * Number.parseFloat(this.mealCalcHelpForm.get("carbsFactor").value) * 0.01 * this.carbsFactor;
        res = Math.round(res);
        this.formGroup.get("KE").setValue(res);
      }
      catch (e) {

      }


      let z: any = { id: "0" };
      z.kek = { id: "1", u: z, array: [{ id: "arr1" }], kk: { id: "2", asd: { id: "3", rel: z } } };
      z.self = z; 

      let TestObj: any = { id: "0", kek: { id: "1", jj: { id: "0" } } };
      TestObj.self = TestObj;
      let patch = new Patch([], [{ id: "0", jj: [{id:"arrayNeu"},{id:"0"}] }, { id: "1", asd: { id: "999" } }]);
      Patcherino.applyOn(z, patch);
      console.log("reeeady");

      let kek = new JJ();
      kek.id = "asd";
      kek.test = "tt";
      kek.u = "u";
      for (let k in kek) {
        console.log("PROP: " + k);
      }
      let zuzu = new Patch([{ id: "asd", u: "lel" }], [])
      Patcherino.applyOn(kek, zuzu);
      console.log("öööö");
    }
  }

  ngOnInit() {
  }

  closeThis() {
    this.close.next(null);
  }

  openDialog(event: Event): void {
    const dialogRef = this.dialog.open(FoodPickerComponent, {
      width: '80%',
      height: '600px',
      data: {}, panelClass: "full_screen_dialog"
    });
    event.preventDefault();
    event.stopPropagation();
    this.ref.nativeElement.blur();
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ref.nativeElement.blur();
    });

  }

}
