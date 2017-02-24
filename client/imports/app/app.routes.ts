import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { UserListComponent } from './user/list.component';
import { AppComponent } from './app.component';
import { UserAddComponent } from './user/add.component';
import { UserEditComponent } from './user/edit.component';
import { HomeComponent } from './home.component';
import { FoodListComponent } from './food/list.component';
import { FoodAddComponent } from './food/add.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserListComponent,  canActivate: ['canActivateForLoggedIn'] },
    { path: 'foods', component: FoodListComponent, },
  { path: 'addUser', component: UserAddComponent  },
   { path: 'add', component: FoodAddComponent  },
  { path: 'edit/:userID', component: UserAddComponent},
   { path: 'edit/:foodID', component: FoodAddComponent , canActivate: ['canActivateForLoggedIn']},
     { path: 'login', component:AuthComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
export const ROUTES_PROVIDERS = [{
 provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];