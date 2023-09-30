import {
  IProductRepository,
  IUseCase,
  TGetProductUseCaseInput,
  TGetProductUseCaseOutput,
} from "../domain";

export class GetProductUseCase
  implements IUseCase<TGetProductUseCaseInput, TGetProductUseCaseOutput>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    input: TGetProductUseCaseInput
  ): Promise<TGetProductUseCaseOutput> {
    const product = await this.productRepository.getProduct({
      product_id: input.product_id,
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}
