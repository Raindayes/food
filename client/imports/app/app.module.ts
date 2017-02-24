import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AccountsModule} from 'angular2-meteor-accounts-ui';

import { AppComponent } from "./app.component";
import { UserListComponent } from './user/list.component';
import { UserAddComponent } from './user/add.component';
import { AppRoutingModule }  from './app.routes';
import { UserDataService } from './user/user-data.service';

import { routes , ROUTES_PROVIDERS } from './app.routes';
import { HomeComponent } from './home.component';

import { FoodListComponent } from './food/list.component';
import { FoodAddComponent } from './food/add.component';
import { FoodDataService } from './food/food-data.service';
import { AuthComponent } from './auth/auth.component';
import {AuthGuard} from "./auth/annotations";

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    UserListComponent,
    UserAddComponent,
    HomeComponent,
    FoodAddComponent,
    FoodListComponent,
    AuthComponent,
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
     UserDataService,
     ...ROUTES_PROVIDERS,
     FoodDataService,
       AuthGuard
  ],
  // Modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccountsModule
    
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
