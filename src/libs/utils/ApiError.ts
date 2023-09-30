import { ErrorStatusCodes } from "./error-status-codes";

export class ApiError extends Error {
  public statusCode: number;
  public errorDetails?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: ErrorStatusCodes,
    errorDetails?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
  }
}
