import { Db } from "mongodb";
import {
  ProductChangeHistoryRepository,
  ProductRepository,
  mongoClient,
} from "./adapters";
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  GetProductChangeHistoriesUseCase,
  GetProductUseCase,
  UpdateProductUseCase,
} from "../core";
import { ProductsController } from "./presentations/controllers";

// Db Instance
const dbClient = new Db(mongoClient, "rocketfy-challenge");

// Repositories
const productRepository = new ProductRepository(dbClient);
const productChangeHistoryRepository = new ProductChangeHistoryRepository(
  dbClient
);

// Use cases
const createProductUseCase = new CreateProductUseCase(
  productRepository,
  productChangeHistoryRepository
);

const updateProductUseCase = new UpdateProductUseCase(
  productRepository,
  productChangeHistoryRepository
);

const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const getProductUseCase = new GetProductUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getProductsChangeHistoriesUseCase = new GetProductChangeHistoriesUseCase(
  productChangeHistoryRepository
);

// Controllers
export const productsController = ProductsController(
  createProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  getProductUseCase,
  getAllProductsUseCase,
  getProductsChangeHistoriesUseCase
);
