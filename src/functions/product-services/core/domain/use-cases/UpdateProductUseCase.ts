import { IProduct } from "@libs/entities";
import { UpdateProductDto } from "../dto";

export type TUpdateProductUseCaseInput = UpdateProductDto;
export type TUpdateProductUseCaseOutput = IProduct;
