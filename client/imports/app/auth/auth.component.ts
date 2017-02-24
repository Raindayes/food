  import { Component , NgZone} from '@angular/core';
  import template from "./auth.component.html";
  
  import {  FormGroup,  FormControl, FormBuilder} from '@angular/forms';

import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';
  import { User } from '../../../../both/models/user.model';

  @Component({
    selector: 'auth-form',
    template,

  })
@InjectUser('user')
  export class AuthComponent {

   isLoggedIn = false;
    errors: Array<string>;
  
    loginForm: FormGroup;
     
      constructor(private zone: NgZone,
          private formBuilder: FormBuilder,) {

       this.loginForm = formBuilder.group({
        'email': [''],
        'password': ['']
  
      })
      
  }

  login(): void {

    let email: string = this.loginForm.value.email;
    let password: string = this.loginForm.value.password;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        this.errors.push(error.reason || "Unknown error");
      }
      else {
         
      }
    });
  }
  logout(): void {
    Meteor.logout();
   
  }

}