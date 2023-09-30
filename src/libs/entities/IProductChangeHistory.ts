import { ObjectId } from "mongodb";

export enum ProductActions {
  PRODUCT_CREATED = "PRODUCT_CREATED",
  PRODUCT_UPDATED = "PRODUCT_UPDATED",
}

export interface IProductChangeHistory {
  _id: ObjectId;
  product_id: ObjectId;
  action: ProductActions;
  quantity: number;
  price: number;
  timestamp: Date;
}
