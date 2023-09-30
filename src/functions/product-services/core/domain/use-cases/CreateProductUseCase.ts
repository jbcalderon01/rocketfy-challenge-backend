import { IProduct } from "@libs/entities";
import { CreateProductDto } from "../dto";

export type TCreateProductUseCaseInput = CreateProductDto;
export type TCreateProductUseCaseOutput = IProduct;
