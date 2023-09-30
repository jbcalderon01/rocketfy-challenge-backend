import { FastifySchema, RouteShorthandOptions } from "fastify";

export interface SchemaCompiler extends RouteShorthandOptions {
  schema: FastifySchema;
}
