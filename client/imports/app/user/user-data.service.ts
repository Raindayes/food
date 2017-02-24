import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import { User } from "../../../../both/models/user.model";
import { Users } from "../../../../both/collections/users.collection";

@Injectable()
export class UserDataService {
  private data: ObservableCursor<User>;

  constructor() {
    this.data = Users.find({});
  }

  public getData(): ObservableCursor<User> {
    return this.data;
  }
}

