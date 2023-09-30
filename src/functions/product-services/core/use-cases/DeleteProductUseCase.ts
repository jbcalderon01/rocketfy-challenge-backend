import { ApiError, ErrorStatusCodes } from "@libs/utils";
import {
  IProductRepository,
  IUseCase,
  TDeleteProductUseCaseInput,
  TDeleteProductUseCaseOutput,
} from "../domain";
import { PRODUCT_ERROR } from "../domain/interfaces";

export class DeleteProductUseCase
  implements IUseCase<TDeleteProductUseCaseInput, TDeleteProductUseCaseOutput>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    input: TDeleteProductUseCaseInput
  ): Promise<TDeleteProductUseCaseOutput> {
    const product = await this.productRepository.getProduct({
      product_id: input.product_id,
    });

    if (!product) {
      throw new ApiError(
        PRODUCT_ERROR.PRODUCT_NOT_FOUND,
        ErrorStatusCodes.NotFound
      );
    }

    await this.productRepository.deleteProduct(input.product_id);

    return product;
  }
}
