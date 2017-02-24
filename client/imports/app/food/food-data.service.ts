import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import { Food } from "../../../../both/models/food.model";
import { Foods } from "../../../../both/collections/foods.collection";

@Injectable()
export class FoodDataService {
  private data: ObservableCursor<Food>;

  constructor() {
    this.data = Foods.find({});
  }

  public getData(): ObservableCursor<Food> {
    return this.data;
  }

  
}
