import { Db, ObjectId } from "mongodb";
import {
  CreateProductDto,
  GetProductDto,
  GetProductsDto,
  IProductRepository,
  UpdateProductDto,
} from "../../../core";
import { IProduct, TPagination } from "@libs/entities";

export class ProductRepository implements IProductRepository {
  private collection = "products";
  constructor(private readonly dbClient: Db) {}

  async createProduct(dto: CreateProductDto): Promise<IProduct> {
    const productObj = {
      tags: dto.tags,
      name: dto.name,
      description: dto.description,
      sku: dto.sku,
      image_url: dto.image_url,
      price: dto.price,
      quantity: dto.quantity,
      created_at: new Date(),
    };

    const response = await this.dbClient
      .collection<Omit<IProduct, "_id">>(this.collection)
      .insertOne(productObj);

    return {
      _id: response.insertedId,
      ...productObj,
    };
  }

  async deleteProduct(id: string): Promise<boolean> {
    const response = await this.dbClient
      .collection<IProduct>(this.collection)
      .deleteOne({ _id: new ObjectId(id) });

    return response.deletedCount === 1;
  }

  async getProduct(dto: GetProductDto): Promise<IProduct | null> {
    const response = await this.dbClient
      .collection<IProduct>(this.collection)
      .findOne({
        ...(dto.product_id && { _id: new ObjectId(dto.product_id) }),
        ...(dto.sku && { sku: dto.sku }),
      });

    return response;
  }

  async updateProduct({
    _id,
    sku,
    ...rest
  }: UpdateProductDto): Promise<IProduct | null> {
    const response = await this.dbClient
      .collection<IProduct>(this.collection)
      .findOneAndUpdate(
        {
          _id: new ObjectId(_id),
        },
        {
          $set: {
            ...rest,
            ...(sku ? { sku } : {}),
          },
        },
        { returnDocument: "after" }
      );

    return response;
  }

  async getAllProducts(dto: GetProductsDto): Promise<TPagination<IProduct>> {
    const {
      name,
      price,
      quantity,
      sku,
      tags,
      page,
      per_page,
      sortBy,
      sortDirection,
    } = dto;

    const query = {
      ...(name && { name: { $regex: name, $options: "i" } }),
      ...(sku && { sku: sku }),
      ...(price && { price: price }),
      ...(quantity && { quantity: quantity }),
      ...(tags && { tags: { $in: tags } }),
    };

    const response = await this.dbClient
      .collection<IProduct>(this.collection)
      .find(query, {
        ...(per_page && { limit: per_page }),
        ...(page && { skip: page * per_page }),
        ...(sortBy && { sort: { [sortBy]: sortDirection === "asc" ? 1 : -1 } }),
      })
      .toArray();

    const totalCount = await this.dbClient
      .collection<IProduct>(this.collection)
      .countDocuments(query);

    return {
      data: response,
      total_count: totalCount,
      per_page: per_page,
      page,
    };
  }
}
