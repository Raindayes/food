import { CollectionObject } from './collection-object.model';

export interface Food extends CollectionObject{
 

  title: string;
  material: string;
  recepie: string;
  owner?: string;
  // image:string;
  public: boolean;
  type: string;

}
