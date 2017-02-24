import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Router } from '@angular/router';

import { FoodDataService } from "./food-data.service";
import { Foods } from "../../../../both/collections/foods.collection";
import { Food } from '../../../../both/models/food.model';
import template from "./list.component.html";


@Component({
  selector: "food-list",
  template,
 
})
export class FoodListComponent implements OnInit , OnDestroy{

  foods: Observable<Food[]>;
  foodSub : Subscription;

  constructor(
    private foodDataService: FoodDataService,
   private _route: Router)
    {
      if (!Meteor.userId()) {
      alert('Please log in');
       this._route.navigate(['home']);
  }
  }

  ngOnInit() {
     this.foodSub = MeteorObservable.subscribe('foods').subscribe( 
       () => {
      this.foods = this.foodDataService.getData().zone();
          
       }
     );

    console.log(this.foods);

  }
  remove(food : Food): void {
    Foods.remove(food._id);
    console.log(food._id);

  }

    ngOnDestroy() {
      this.foodSub.unsubscribe();
    }

    search(value: string) {
    
            this.foods = Foods.find(value ? { type: value } : {}).zone();
    
  
    }
  

}
