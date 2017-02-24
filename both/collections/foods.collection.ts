import { MongoObservable } from "meteor-rxjs";
import { Food } from "../models/food.model";
import { Meteor } from 'meteor/meteor';

export const Foods = new MongoObservable.Collection<Food>('foods');
// export var Foods: Mongo.Collection < Food>;


function loggedIn() {
  return !!Meteor.user();
}

Foods.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});