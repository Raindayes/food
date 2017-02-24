import { Component } from '@angular/core';
import  template   from './edit.component.html'; 
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';

import { Users } from '../../../../both/collections/users.collection';
import { UserDataService } from './user-data.service';
import { User } from '../../../../both/models/user.model';

import {  FormGroup,
  FormControl,
   Validators,
  FormBuilder,

} from '@angular/forms';


@Component({
     selector: 'user-edit',
     template,
     
})

export class UserEditComponent {

  loginForm: FormGroup;
user: User;
name: string;
pwd:  string;

  constructor(private formBuilder: FormBuilder,
  private _router : Router
  ) {

    this.loginForm = formBuilder.group({

        'uname': ['', [Validators.required, ]],
        'password': ['', Validators.required]
    });
  }
  login() {
 
  this.name  =  this.loginForm.value.uname;
  this.pwd = this.loginForm.value.password;
  console.log(this.name);
  
  console.log(this.user =  Users.findOne({'uname': this.name , 'password': this.pwd }));
  if(!this.user) {
   alert('Please log in');
     
  }else{
        alert('successful');
    this._router.navigate(['home']);
  }
  
}
}



//   angular.module('toolbarDemo1', ['ngMaterial'])

// .controller('AppCtrl', function($scope) {

// });
//     title = 'بروزرسانی '

//   userID: string;
//   userSub: Subscription;
//   // user: User;
//   user;
//   paramsSub: Subscription;
  

//   constructor(
//   // private _routeParams:
//   private route: ActivatedRoute,
//   // private userService: UserDataService 
//   ) {}

  
//     ngOnInit(){

//      this.paramsSub = this.route.params.subscribe( params => {
//   this.userID =  params['userID'];
//       console.log(params);
//       console.log(this.userID);
      
//      this.user = Users.findOne(this.userID);

//   console.log('userData',(this.user));

//      });
// }
//       ngOnDestroy() {
//     // this.sub.unsubscribe();
//   }
// }
//  var id = this._routeParams.get("id");
// this.sub = this.route.params.subscribe( params => {
//   this.id = + params['id'];
// })
    //  this.paramsSub = this.route.params
    //  .map(params => params['userId'])
    //  .subscribe(userId => {
    //    this.userID = userId;
    //    if (this.userSub) {
    //      this.userSub.unsubscribe();
      //  }
        // this.userSub = MeteorObservable.subscribe('user', this.userID).subscribe(() => {
        //   MeteorObservable.autorun().subscribe(() => {
        //     this.user = Users.findOne(this.userID);
//       });
//  });