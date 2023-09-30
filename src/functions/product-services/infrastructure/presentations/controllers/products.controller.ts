import { FastifyRequest } from "fastify";
import {
  CreateProductDto,
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductChangeHistoriesUseCase,
  GetProductUseCase,
  GetProductsDto,
  UpdateProductDto,
  UpdateProductUseCase,
} from "../../../core";

export function ProductsController(
  createProductUseCase: CreateProductUseCase,
  updateProductUseCase: UpdateProductUseCase,
  deleteProductUseCase: DeleteProductUseCase,
  getProductUseCase: GetProductUseCase,
  getAllProductsUseCase: GetAllProductsUseCase,
  getProductsChangeHistoriesUseCase: GetProductChangeHistoriesUseCase
) {
  async function getProduct(
    req: FastifyRequest<{ Params: { productId: string } }>
  ) {
    const { productId } = req.params;

    const product = await getProductUseCase.execute({
      product_id: productId,
    });
    return product;
  }

  async function getProductsChangeHistories(
    req: FastifyRequest<{ Params: { productId: string } }>
  ) {
    const { productId } = req.params;
    const product = await getProductsChangeHistoriesUseCase.execute({
      product_id: productId,
    });

    return product;
  }

  async function deleteProduct(
    req: FastifyRequest<{ Params: { productId: string } }>
  ) {
    const { productId } = req.params;

    const product = await deleteProductUseCase.execute({
      product_id: productId,
    });

    return product;
  }

  async function getAllProducts(
    req: FastifyRequest<{ Querystring: GetProductsDto & { tags: string } }>
  ) {
    const {
      page = 0,
      per_page = 10,
      name,
      sku,
      price,
      quantity,
      sortBy = "createdAt",
      sortDirection = "desc",
      tags,
    } = req.query;

    const products = await getAllProductsUseCase.execute({
      page: page,
      per_page: per_page,
      sortBy: sortBy as string,
      sortDirection: sortDirection as "asc" | "desc",
      tags: tags ? JSON.parse(tags as string) : undefined,
      name: name as string,
      sku: sku as string,
      price: price,
      quantity: quantity,
    });

    return products;
  }

  async function updateProduct(
    req: FastifyRequest<{
      Params: { productId: string };
      Body: UpdateProductDto;
    }>
  ) {
    const { name, price, description, image_url, quantity, sku, tags } =
      req.body;
    const { productId } = req.params;

    const product = await updateProductUseCase.execute({
      _id: productId,
      name,
      price,
      description,
      image_url,
      quantity,
      sku,
      tags,
    });

    return product;
  }

  async function createProduct(
    req: FastifyRequest<{
      Body: CreateProductDto;
    }>
  ) {
    const {
      name,
      price,
      created_at,
      description,
      tags,
      image_url,
      quantity,
      sku,
    } = req.body;

    const product = await createProductUseCase.execute({
      name,
      price,
      created_at,
      description,
      image_url,
      tags,
      quantity,
      sku,
    });

    return product;
  }

  return {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getProductsChangeHistories,
    getProduct,
  };
}
