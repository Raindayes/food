import { Component , NgZone} from '@angular/core';
import template from "./auth.component.html";
// import style from './auth.component.css';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';
import { User } from '../../../../both/models/user.model';

declare var Package;
declare var _;

@Component({
  selector: 'auth-form',
  template,
  // styles: [style]
})
export class AuthComponent {
   autorunComputation: Tracker.Computation;
  currentUser: Meteor.User;
  currentUserId: string;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  services: Array<any>;
  // credentials: LoginCredentials;
   credentials: User;
  errors: Array<string>;
  isPasswordRecovery: boolean;
  isSignup: boolean;
  isDropdownOpen: boolean;
  message: string;

 constructor(private zone: NgZone) {
    this._initAutorun();
    this.services = this._getLoginServices();
    this.resetErrors();
    this.isPasswordRecovery = false;
    this.isSignup = false;
    this.isDropdownOpen = false;
    this._resetCredentialsFields();
  }

  _resetCredentialsFields() {
    this.credentials = { email: '', password: '',username: '',
  fname: '',
  lname: '',
  gender: '',
 createdAt: 0,
  city: ''
  }
  }
    resetErrors() {
    this.errors = [];
    this.message = "";
  }

  login(): void {
    this.resetErrors();

    let email: string = this.credentials.email;
    let password: string = this.credentials.password;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        this.errors.push(error.reason || "Unknown error");
      }
      else {
        this.isDropdownOpen = false;
        this._resetCredentialsFields();
      }
    });
  }

  recover() {
    this.resetErrors();

    Accounts.forgotPassword({ email: this.credentials.email }, (error) => {
      if (error) {
        this.errors.push(error.reason || "Unknown error");
      }
      else {
        this.message = "You will receive further instruction to you email address!";
        this.isDropdownOpen = false;
        this._resetCredentialsFields();
      }
    });
  }


  singleService(): Object {
    let services = this._getLoginServices();

    return services[0];
  }

  displayName(): string {
    let user : any = this.currentUser;

    if (!user)
      return '';

    if (user.profile && user.profile.name)
      return user.profile.name;

    if (user.username)
      return user.username;

    if (user.emails && user.emails[0] && user.emails[0].address)
      return user.emails[0].address;

    return '';
  };


  logout(): void {
    Meteor.logout();
    this.isDropdownOpen = false;
  }

    _hasPasswordService(): boolean {
    return !!Package['accounts-password'];
  }

  _getLoginServices(): Array<any> {
    let services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];
    services.sort();

    if (this._hasPasswordService())
      services.push('password');

    return _.map(services, function(name) {
      return { name: name };
    });
  }

  dropdown(): boolean {
    return this._hasPasswordService() || this._getLoginServices().length > 1;
  }

  _initAutorun(): void {
    this.autorunComputation = Tracker.autorun(() => {
      this.zone.run(() => {
        this.currentUser = Meteor.user();
        this.currentUserId = Meteor.userId();
        this.isLoggingIn = Meteor.loggingIn();
        this.isLoggedIn = !!Meteor.user();
      })
    });
  }
close(){
      this.isDropdownOpen = false;
}
}