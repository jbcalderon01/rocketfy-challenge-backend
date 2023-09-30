import { Db, ObjectId } from "mongodb";
import {
  CreateProductChangeHistoryDto,
  IProductChangeHistoryRepository,
} from "../../../core";
import { IProductChangeHistory } from "@libs/entities";

export class ProductChangeHistoryRepository
  implements IProductChangeHistoryRepository
{
  private collection = "product-change-histories";
  constructor(private readonly dbClient: Db) {}

  async create(dto: CreateProductChangeHistoryDto): Promise<string> {
    const response = await this.dbClient
      .collection<Omit<IProductChangeHistory, "_id">>(this.collection)
      .insertOne(dto);

    return response.insertedId.toHexString();
  }

  async getProductChangeHistories(
    productId: string
  ): Promise<IProductChangeHistory[]> {
    const response = await this.dbClient
      .collection<IProductChangeHistory>(this.collection)
      .find(
        { product_id: new ObjectId(productId) },
        { sort: { timestamp: -1 } }
      )
      .toArray();

    return response;
  }
}
