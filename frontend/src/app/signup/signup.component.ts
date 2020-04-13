import { Component, OnInit } from '@angular/core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import {SignupModel} from '../signup-model'

import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { emailValidator } from '../email-validation.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  private PHP_API_URL = "http://localhost/Cloutstack/login";


  signupModel = new SignupModel('', '');

  submitted = false;

  onSubmit(data){
    this.submitted = true;
  }

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  signUpPressed(){
    // Eventually Send data to backend
    console.log(this.form.value);
    this.http.post<any>(`${this.PHP_API_URL}/signup.php`, this.form.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })

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
     this.signUpPressed();
    (function ($) {
      alert($('form').serialize());
    })(jQuery);
   })
  }

  get email() {return this.form.get('email');}
  get password() {return this.form.get('password');}

}
