import { Component , NgZone} from '@angular/core';
import  template   from './add.component.html'; 
import style from './add.component.scss';

import { Users } from '../../../../both/collections/users.collection';
import { UserDataService } from './user-data.service';
import { User } from '../../../../both/models/user.model';
import { Observable } from 'rxjs/Observable'; 
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import {  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray} from '@angular/forms';
import { Router } from '@angular/router';


import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';



@Component({
     selector: 'user-add',
     template,
     styles : [style]
})
export class UserAddComponent {

  autorunComputation: Tracker.Computation;
  currentUser: Meteor.User;
  currentUserId: string;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  services: Array<any>;
  errors: Array<string>;
  isPasswordRecovery: boolean;
  isSignup: boolean;
  isDropdownOpen: boolean;
  message: string;


  userID: string;
  userSub: Subscription;
  user: User;
  paramsSub: Subscription;
  title = '';

   myForm: FormGroup;

    genders = [
    'male',
    'female'
  ];

  

 constructor(private zone: NgZone,
   private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private _route: Router,
  private userService: UserDataService) {
 
    this.resetErrors();
    this.isSignup = false;
  

  //  if (!Meteor.userId()) {
  //    alert('Please log in');
  //         this._route.navigate(['home']);
  // }
    this.myForm = formBuilder.group({

        'username': ['', [Validators.required]],
        'password': ['', Validators.required],
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
    
          '_id': [''],
      'fname': ['', Validators.required],
      'lname' : ['', Validators.required],
      'city': ['', Validators.required],
      'gender': ['', Validators.required],
      'image' : ['']
     
      })
  
    // this.myForm.statusChanges.subscribe(
    //   (data: any) => console.log(data)
    // );
    
  }

  
ngOnInit () {


     this.paramsSub = this.route.params.subscribe( params => {
       
      this.userID =  params['userID'];

         if(!this.userID) {
    this.title = 'افزودن کاربر';
       }else{
       this.title = 'بروزرسانی'
       
     this.userID =  params['userID'];      
     this.user = Users.findOne(this.userID);
    
    console.log('userData',(this.user));
     (<FormGroup>this.myForm)
            .setValue(this.user);
       }
     });
}
  
    resetErrors() {
    this.errors = [];
    this.message = "";
  }


 
      onSubmit() {
      
        this.resetErrors();
             this.paramsSub = this.route.params.subscribe( params => {
   this.userID =  params['userID'];  
         if(!this.userID) {
    // Users.insert({
    //         username: this.myForm.value.username,
    //         email: this.myForm.value.email,
    //         password: this.myForm.value.password,
    //         fname: this.myForm.value.fname,
    //         lname: this.myForm.value.lname,
    //         city: this.myForm.value.city,
    //         gender: this.myForm.value.gender,
    // }, );

      Accounts.createUser({
            email: this.myForm.value.email,
            password: this.myForm.value.password,
            profile: {
            username: this.myForm.value.username,
            fname: this.myForm.value.fname,
            lname: this.myForm.value.lname,
            city: this.myForm.value.city,
            gender: this.myForm.value.gender,
            
        }
      });
         }else{

         }
    this.myForm.reset();
  
  this._route.navigate(['home']);
  });
  }
            
    click(event){

      console.log(event);
      
    // console.log(this.base64.encodeFile(file));
    console.log('click');
    }


//   onSubmit() {

//      this.paramsSub = this.route.params.subscribe( params => {
//    this.userID =  params['userID'];  
//          if(!this.userID) {
//     Users.insert({
    
//           uname: this.myForm.value.uname,
//           fname: this.myForm.value.fname,
//           lname: this.myForm.value.lname,
//           password: this.myForm.value.password,
//           regdate: this.myForm.value.regdate,
//           city: this.myForm.value.city,
//           email: this.myForm.value.email,
//           gender: this.myForm.value.gender, 
//  })
//          }else{
//     Users.update(this.user._id, {
//       $set: {
        
//           uname: this.myForm.value.uname,
//           fname: this.myForm.value.fname,
//           lname: this.myForm.value.lname,
//           password: this.myForm.value.password,
//           regdate: this.myForm.value.regdate,
//           city: this.myForm.value.city,
//           email: this.myForm.value.email,
//           gender: this.myForm.value.gender, 
//       }
//     });
//   }
//      });
   
  // exampleValidator(control: FormControl): {[s: string]: boolean} {
  //   if (control.value === 'Example') {
  //     return {example: true};
  //   }
  //   return null;
  // }

  // asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>(
  //     (resolve, reject) => {
  //       setTimeout(() => {
  //         if (control.value === 'Example') {
  //           resolve({'invalid': true});
  //         } else {
  //           resolve(null);
  //         }
  //       }, 1500);
  //     }
  //   );
  //   return promise;
  // }
      // }

 

    //template driven form
    //  user = {
    //     uname: '',
    //     email: '',
    //     password: '',
    //     fname: '',
    //     lname: '',
    //     city: '',
    //     gender: ''
    //  }
    //  genders = [
    //    'مرد',
    //     'زن'
    //  ]

    //  onSubmit(form: NgForm) {
    //    console.log(form.value);
    //    form.reset();
       
    //  }

}


