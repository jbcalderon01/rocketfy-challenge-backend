import { awsLambdaFastify } from "@fastify/aws-lambda";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import app from "./app";

const proxy = awsLambdaFastify(app);

const lambdaHandler = proxy;

exports.handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return lambdaHandler(event, context);
};
