 import  { Users } from '../../../../both/collections/users.collection';
  import  { User } from '../../../../both/models/user.model';

   declare module Karbar {
 
  function user(): User;

  function userId(): string;

  function createUser(options: {
    username?: string;
    email?: string;
    password?: string;
    fname?: string;
  }, callback?: Function): string;

//   function config(options: {
//     sendVerificationEmail?: boolean;
//     forbidClientAccountCreation?: boolean;
//     restrictCreationByEmailDomain?: string | Function;
//     loginExpirationInDays?: number;
//     oauthSecretKey?: string;
//   }): void;

//   function onLogin(func: Function): {
//     stop: () => void
//   };

//   function onLoginFailure(func: Function): {
//     stop: () => void
//   };

//   function loginServicesConfigured(): boolean;

//   function onPageLoadLogin(func: Function): void;
// }
