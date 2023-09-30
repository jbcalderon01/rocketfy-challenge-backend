import { FastifyInstance } from "fastify";
import { productsController } from "../../di";
import {
  createProductSchemaInput,
  getAllProductsSchemaInput,
  updateProductSchemaInput,
} from "../schema";
import { IncomingMessage, Server, ServerResponse } from "http";

export function productsRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get(
    "/",
    getAllProductsSchemaInput,
    productsController.getAllProducts
  );

  fastify.get("/:productId", productsController.getProduct);

  fastify.get(
    "/:productId/product-change-histories",
    productsController.getProductsChangeHistories
  );

  fastify.post("/", createProductSchemaInput, productsController.createProduct);

  fastify.put(
    "/:productId",
    updateProductSchemaInput,
    productsController.updateProduct
  );

  fastify.delete("/:productId", productsController.deleteProduct);
  next();
}
