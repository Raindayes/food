import { MongoObservable } from "meteor-rxjs";
import { User } from "../models/user.model";


export const Users = new MongoObservable.Collection<User>('myuser');


function loggedIn() {
 return !!Meteor.user();
}

Users.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
})
