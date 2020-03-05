import { Component, OnInit } from '@angular/core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'

import { LoginModel } from '../login-model'
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { emailValidator } from '../email-validation.directive' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  faIcons = {
    faEnvelope,
    faKey
  }

  loginModel = new LoginModel('', '', false);

  submitted = false;

  onSubmit(data) { 
    this.submitted = true;
    alert(JSON.stringify(data));
  }

  form: FormGroup


  

  constructor(private fb: FormBuilder) { }

  loginPressed(data){
    // Eventually send data to backend/encrypt password
    alert("It Works! " + this.loginModel.remember);
  }

  ngOnInit(): void {
   this.form = new FormGroup({
     'email': new FormControl(this.loginModel.email,[
       Validators.required,
       emailValidator(new RegExp('^[a-zA-z0-9_]+@[a-zA-Z_]+?[.][a-zA-Z]{2,3}$'))
     ]),
     'password': new FormControl(this.loginModel.password, [
       Validators.required,
     ]),
     'RememberMe': new FormControl(this.loginModel.remember)
     
   })
  }

  get email() {return this.form.get('email');}
  get password() {return this.form.get('password');}
  get RememberMe() {return this.form.get('RememberMe');}

}
