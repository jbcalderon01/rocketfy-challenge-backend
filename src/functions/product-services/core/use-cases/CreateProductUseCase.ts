import { ApiError, ErrorStatusCodes } from "@libs/utils";
import {
  IProductChangeHistoryRepository,
  IProductRepository,
  IUseCase,
  TCreateProductUseCaseInput,
  TCreateProductUseCaseOutput,
} from "../domain";
import { PRODUCT_ERROR } from "../domain/interfaces";
import { ProductActions } from "@libs/entities";

export class CreateProductUseCase
  implements IUseCase<TCreateProductUseCaseInput, TCreateProductUseCaseOutput>
{
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productChangeHistoryRepository: IProductChangeHistoryRepository
  ) {}
  async execute(
    input: TCreateProductUseCaseInput
  ): Promise<TCreateProductUseCaseOutput> {
    const isExistProduct = await this.productRepository.getProduct({
      sku: input.sku,
    });

    if (isExistProduct) {
      throw new ApiError(
        PRODUCT_ERROR.PRODUCT_ALREADY_EXIST,
        ErrorStatusCodes.BadRequest
      );
    }

    const product = await this.productRepository.createProduct(input);

    await this.productChangeHistoryRepository.create({
      action: ProductActions.PRODUCT_CREATED,
      price: product.price,
      product_id: product._id,
      quantity: product.quantity,
      timestamp: product.created_at,
    });

    return product;
  }
}
