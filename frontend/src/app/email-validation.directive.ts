import { Directive } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appEmailValidation]'
})

export class EmailValidationDirective {


  

  constructor() { }

}

export function emailValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : {'invalidEmail': {value: control.value}};
  };
}
