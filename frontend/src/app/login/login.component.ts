import { Component, OnInit } from '@angular/core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'

import { LoginModel } from '../login-model'
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { emailValidator } from '../email-validation.directive'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'


declare var jQuery: any;
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

  private PHP_API_URL = "http://localhost/Cloutstack/api/login";
  loginModel = new LoginModel('', '', false);

  submitted = false;

  onSubmit() { 
    // this.submitted = submit(data)
  }

  form: FormGroup


  

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  loginPressed(){
    // Eventually send data to backend/encrypt password
    //alert("It Works! " + this.loginModel.remember);
    this.submitted = true;
    // alert(JSON.stringify(data));
    this.http.post<any>(`${this.PHP_API_URL}/login.php`, this.form.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/text'
      })
    }).subscribe(result => {
      localStorage.setItem('message', result.message)
      console.log(localStorage.getItem('message'))
      if(result.status == 200){
        localStorage.setItem('username', result.body)
        console.log(localStorage.getItem('username'))
        this.router.navigate(['/feed'])
        
      } else {
        alert(localStorage.getItem('message'));
      }
    })
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
   var loginButton = document.getElementById("loginButton");
   loginButton.addEventListener('click', ()=>{
     this.loginPressed();
    (function ($) {
      //alert($('form').serialize());
    })(jQuery);
   })
   if(localStorage.getItem('login_error')){
     alert(localStorage.getItem('login_error'))
     localStorage.removeItem('login_error')
   }
  }

  get email() {return this.form.get('email');}
  get password() {return this.form.get('password');}
  get RememberMe() {return this.form.get('RememberMe');}

}