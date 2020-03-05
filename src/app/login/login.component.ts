import { Component, OnInit } from '@angular/core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'

import { LoginModel } from '../login-model'

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

  constructor() { }

  loginPressed(data){
    // Eventually send data to backend/encrypt password
    alert("It Works! " + this.loginModel.email);
  }

  ngOnInit(): void {
  }

}
