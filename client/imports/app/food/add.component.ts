import { Component, OnInit, OnDestroy} from '@angular/core';
import template from './add.component.html';
import { Foods} from '../../../../both/collections/foods.collection';
import {FoodDataService} from './food-data.service';
import {Food} from '../../../../both/models/food.model';
import {  Observable} from 'rxjs/Observable';
import { ActivatedRoute} from '@angular/router';
import { Subscription} from 'rxjs/Subscription';
import { Router} from '@angular/router';
import { Meteor} from 'meteor/meteor';
import {MeteorObservable} from 'meteor-rxjs';
import {FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';

import { InjectUser } from 'angular2-meteor-accounts-ui';


@Component({
  selector: 'food-add',
  template,

})
@InjectUser('user')
export class FoodAddComponent implements OnInit {
  foodID: string;
  foodSub: Subscription;
  food: Food;
  paramsSub: Subscription;
  title = '';
  user: Meteor.User;
  foodForm: FormGroup;

    type = [
    'خورشت',
    'دسروشیرینی',
    'غذای محلی',
    'فست فود',
    'انواع پلو'
  ];


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private foodService: FoodDataService,
    private _route: Router
  ) {
    if (!Meteor.userId()) {
      alert('Please log in');
      this._route.navigate(['home']);
    }
    this.foodForm = formBuilder.group({
        'title': ['', Validators.required],
        'recepie': ['', Validators.required],
        'material': ['', Validators.required],
        '_id': [''],
        'owner': Meteor.userId,
        'public': [false],
        'type': ['' , Validators.required]
      }),

      this.foodForm.statusChanges.subscribe(
        (data: any) => console.log(data)
      );
  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(par => {

      this.foodID = par['foodID'];

      if (!this.foodID) {
        this.title = 'افزودن کاربر';
      } else {
        this.title = 'بروزرسانی'

        this.route.params.map(params => params['foodID'])
          .subscribe(foodID => {
            this.foodID = foodID;

            if (this.foodSub) {
              this.foodSub.unsubscribe();
            }
            this.foodSub = MeteorObservable.subscribe('foods', this.foodID).subscribe(
              () => {
                this.food = Foods.findOne(this.foodID);
                ( < FormGroup > this.foodForm)
                .setValue(this.food);
                console.log(this.food);
              });
          });
      }
    });
  }


  onSubmit() {
    if (!Meteor.userId()) {
      alert('Please log in');
      return;
    } else {
      this.paramsSub = this.route.params.subscribe(params => {
        this.foodID = params['foodID'];
        if (!this.foodID) {
          // Parties.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));
          Foods.insert({

            title: this.foodForm.value.title,
            recepie: this.foodForm.value.recepie,
            material: this.foodForm.value.material,
            owner: Meteor.userId(),
            public: this.foodForm.value.public,
            type: this.foodForm.value.type,

          })
        } else {
          Foods.update(this.food._id, {
            $set: {

              title: this.foodForm.value.title,
              recepie: this.foodForm.value.recepie,
              material: this.foodForm.value.material,
              public: this.foodForm.value.public,
              type: this.foodForm.value.type
            }
          });
        }
      });
    }
    this._route.navigate(['foods']);
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}