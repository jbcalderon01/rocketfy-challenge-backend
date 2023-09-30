import { IProduct } from "@libs/entities";

export type TDeleteProductUseCaseInput = {
  product_id: string;
};

export type TDeleteProductUseCaseOutput = IProduct;
