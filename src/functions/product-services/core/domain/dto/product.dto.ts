import { IProduct, IProductChangeHistory } from "@libs/entities";

export type CreateProductDto = Omit<IProduct, "_id">;

export type CreateProductChangeHistoryDto = Omit<IProductChangeHistory, "_id">;

export type UpdateProductDto = Partial<Omit<IProduct, "_id">> & {
  _id: string;
};

export type GetProductDto =
  | { product_id: string; sku?: string }
  | { sku: string; product_id?: string };

export type GetProductsDto = {
  name?: string;
  sku?: string;
  price?: number;
  quantity?: number;
  tags?: string[];
  per_page: number;
  page: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};
