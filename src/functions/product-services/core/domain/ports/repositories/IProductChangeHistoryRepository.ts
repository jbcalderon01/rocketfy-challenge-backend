import { IProductChangeHistory } from "@libs/entities";
import { CreateProductChangeHistoryDto } from "../../dto";

export interface IProductChangeHistoryRepository {
  create(dto: CreateProductChangeHistoryDto): Promise<string>;
  getProductChangeHistories(
    productId: string
  ): Promise<IProductChangeHistory[]>;
}
