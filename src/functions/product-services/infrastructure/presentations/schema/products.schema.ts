import { SchemaCompiler } from "./schema";

export const createProductSchemaInput: SchemaCompiler = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        sku: { type: "string" },
        image_url: { type: "string" },
        price: { type: "number" },
        tags: { type: "array", items: { type: "string" } },
        quantity: { type: "number" },
      },
      required: [
        "name",
        "description",
        "sku",
        "image_url",
        "price",
        "tags",
        "quantity",
      ],
    },
  },
};

export const updateProductSchemaInput: SchemaCompiler = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        sku: { type: "string" },
        image_url: { type: "string" },
        price: { type: "number" },
        tags: { type: "array", items: { type: "string" } },
        quantity: { type: "number" },
      },
    },
  },
};

export const getAllProductsSchemaInput: SchemaCompiler = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        per_page: { type: "number", default: 10 },
        page: { type: "number", default: 0 },
        sortBy: { type: "string", default: "created_at" },
        sortDirection: { type: "string", default: "desc" },
        name: { type: "string" },
        sku: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        tags: { type: "string" },
      },
    },
  },
};
