import { IProduct } from "@libs/entities";

export type TGetProductUseCaseInput = {
  product_id: string;
};

export type TGetProductUseCaseOutput = IProduct;
