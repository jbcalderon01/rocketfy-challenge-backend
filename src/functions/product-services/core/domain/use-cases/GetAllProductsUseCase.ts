import { IProduct, TPagination } from "@libs/entities";
import { GetProductsDto } from "../dto";

export type TGetAllProductsUseCaseInput = GetProductsDto;
export type TGetAllProductsUseCaseOutput = TPagination<IProduct>;
