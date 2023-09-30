import {
  IProductRepository,
  IUseCase,
  TGetAllProductsUseCaseInput,
  TGetAllProductsUseCaseOutput,
} from "../domain";

export class GetAllProductsUseCase
  implements
    IUseCase<TGetAllProductsUseCaseInput, TGetAllProductsUseCaseOutput>
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    input: TGetAllProductsUseCaseInput
  ): Promise<TGetAllProductsUseCaseOutput> {
    const products = await this.productRepository.getAllProducts(input);

    return products;
  }
}
