import { Meteor } from 'meteor/meteor';
import { Foods } from '../../../both/collections/foods.collection';


Meteor.publish('foods', function() {
 
      return Foods.find(buildQuery.call(this));
});

Meteor.publish('foods' , function(foodId: string) {
    return Foods.find(buildQuery.call(this, foodId));
});

function buildQuery(foodId?: string): Object {
    const isAvailable = {
    $or: [{
     public: true
  },
   // or
   { 
     // current user is the owner
      $and: [{
        owner: this.userId 
      }, {
        owner: {
       $exists: true
        }
     }]
   }]
  };

if (foodId) {
    return {
        $and: [{
            _id: foodId   
        },
        isAvailable
        ]
    };
}
return isAvailable;
}







// Meteor.publish('foodData', () => Foods.find());
// Meteor.publish('foodData', function() {
//   const selector = {
//     $or: [{
//      // party is public
//   },
//    // or
//    { 
//      // current user is the owner
//       $and: [{
//         owner: this.userId 
//       }, {
//         owner: {
//        $exists: true
//         }
//      }]
//    }]
//   };

//   return Foods.find(selector);
// });