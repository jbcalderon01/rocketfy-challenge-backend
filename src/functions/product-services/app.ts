import { connectToDatabase, productsRoutes } from "./infrastructure";
import fastify from "fastify";
import { errorFormatter } from "@libs/utils";
import cors from "@fastify/cors";

const app = fastify();
connectToDatabase();

app.setErrorHandler(errorFormatter);
app.register(cors);
app.register(productsRoutes, { prefix: "/products" });

export default app;
