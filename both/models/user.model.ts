import { CollectionObject } from './collection-object.model';

export interface User {
  _id?: string;
  username: string;
  fname: string;
  lname: string;
  password: string;
  gender: string;
  createdAt?: number;
  city: string;
  email: string;
  /*avatar:string;*/
}
