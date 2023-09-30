import { IProductChangeHistory } from "@libs/entities";

export type TGetProductChangeHistoriesUseCaseInput = {
  product_id: string;
};

export type TGetProductChangeHistoriesUseCaseOutput = IProductChangeHistory[];
