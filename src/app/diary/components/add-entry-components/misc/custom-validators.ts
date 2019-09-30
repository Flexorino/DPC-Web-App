import { FormUtil } from './../../../../../shared/util/form-util';
import { ConstructionConstrol } from './../../../../../shared/util/construction-control';
import { ConstructionControlValue } from './../../../../../shared/util/construction-constrol-value';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
export class CustomValidators {
    static required(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return { notInit: null };
        }
        let constructionControl: ConstructionConstrol<ConstructionControlValue<any>> = control as ConstructionConstrol<ConstructionControlValue<any>>;
        return constructionControl.value.constructed ? null : { required: null };

    }

    static complexRequiredFactory(required2: AbstractControl[], atLeastOne2: AbstractControl[]) {
        let required: ConstructionConstrol<ConstructionControlValue<any>>[] = required2 as ConstructionConstrol<any>[];
        let atLeastOne: ConstructionConstrol<ConstructionControlValue<any>>[] = atLeastOne2 as ConstructionConstrol<any>[];

        return FormUtil.save((control: AbstractControl): ValidationErrors | null => {
            /*
                       let found = null;
                       required.forEach(x => {
                           if(x.value.constructed == null){
                               found = x;
                           }
                       });
                       console.log("XX: "+ found);
                       if (required.find(x => x.value.constructed == null)) {
                           console.warn("required" + console.warn(JSON.stringify(required.find(x => x.value.empty))));
                           return { required: null };
                       }
                       */
            let found = atLeastOne.find(x => !x.value.empty);
            if (!found) {
                console.warn("atLeastOne");
                return { atLestOne: null };
            }
            console.log("found Value: " + JSON.stringify(found.value));
            console.log("TRUE");
            return null;
        });
    }
} 