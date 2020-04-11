import { Component, OnInit } from '@angular/core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import {SignupModel} from '../signup-model'

import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { emailValidator } from '../email-validation.directive';

declare var jQuery: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  faIcons = {
    faEnvelope,
    faKey
  }

  signupModel = new SignupModel('', '');

  submitted = false;

  onSubmit(data){
    this.submitted = true;
  }

  constructor(private fb: FormBuilder) { }

  signUpPressed(data){
    // Eventually Send data to backend
  }


  form: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(this.signupModel.email, [
        Validators.required,
        emailValidator(new RegExp('^[a-zA-z0-9_]+@[a-zA-Z_]+?[.][a-zA-Z]{2,3}$'))
      ]),
      'password': new FormControl(this.signupModel.password, [
        Validators.required
      ])
    })
    var signupButton = document.getElementById("signupButton");
   signupButton.addEventListener('click', ()=>{
     this.submitted = true;
    (function ($) {
      alert($('form').serialize());
    })(jQuery);
   })
  }

  get email() {return this.form.get('email');}
  get password() {return this.form.get('password');}

}
