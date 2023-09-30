import { IProduct, TPagination } from "@libs/entities";
import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
  GetProductDto,
} from "../../dto";

export interface IProductRepository {
  getProduct(dto: GetProductDto): Promise<IProduct | null>;
  getAllProducts(dto: GetProductsDto): Promise<TPagination<IProduct>>;
  createProduct(dto: CreateProductDto): Promise<IProduct>;
  updateProduct(dto: UpdateProductDto): Promise<IProduct | null>;
  deleteProduct(product_id: string): Promise<boolean>;
}
