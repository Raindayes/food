import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Router } from '@angular/router';
import { InjectUser } from 'angular2-meteor-accounts-ui';


import { UserDataService } from "./user-data.service";
import { Users } from "../../../../both/collections/users.collection";
import { User } from '../../../../both/models/user.model';
import template from "./list.component.html";


@Component({
  selector: "user-list",
  template,
 
})
@InjectUser('user')
export class UserListComponent implements OnInit , OnDestroy{

  users: Observable<User[]>;
  userSub : Subscription;
  user: Meteor.User;
  list: any;

   constructor(
    private userDataService: UserDataService,
    private _route: Router
    ) {

    if (!Meteor.userId()) {
      alert('Please log in');
       this._route.navigate(['home']);
  }
    }
  ngOnInit() {
  
    console.log (this.user);
    
    

    // this.users =Observable.create (this.user);
    // this.users = this.userDataService.getData().zone();

  // this.userSub = MeteorObservable.subscribe('parties').subscribe(() => {
  //       this.users = Users.find({} ).zone();
  //     });
  
  // this.userSub = MeteorObservable.subscribe('users').subscribe(() => {
  //       this.users = Users.find({} ).zone();
  
  //     });
    console.log(this.users);


  }
  remove(user : User): void {
    Users.remove(user._id);
    console.log(user._id);

  }

    ngOnDestroy() {
      // this.userSub.unsubscribe();
    }

}
