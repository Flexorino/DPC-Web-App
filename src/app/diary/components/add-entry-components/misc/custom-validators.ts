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
} 