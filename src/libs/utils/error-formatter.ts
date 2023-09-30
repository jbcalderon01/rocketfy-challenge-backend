import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function errorFormatter(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) {
  const {
    validation: __,
    validationContext: ___,

    ...rest
  } = error;

  const toSend = {
    ...rest,
    message: error.message,
    statusCode: error.statusCode || 500,
  };

  // TODO: Call the logger here.
  Reflect.deleteProperty(toSend, "errorDetails");

  reply.code(toSend.statusCode).send(toSend);
}
