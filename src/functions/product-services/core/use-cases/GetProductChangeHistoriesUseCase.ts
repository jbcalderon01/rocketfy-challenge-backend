import {
  IProductChangeHistoryRepository,
  IUseCase,
  TGetProductChangeHistoriesUseCaseInput,
  TGetProductChangeHistoriesUseCaseOutput,
} from "../domain";

export class GetProductChangeHistoriesUseCase
  implements
    IUseCase<
      TGetProductChangeHistoriesUseCaseInput,
      TGetProductChangeHistoriesUseCaseOutput
    >
{
  constructor(
    private readonly productChangeHistoryRepository: IProductChangeHistoryRepository
  ) {}

  async execute(
    input: TGetProductChangeHistoriesUseCaseInput
  ): Promise<TGetProductChangeHistoriesUseCaseOutput> {
    return this.productChangeHistoryRepository.getProductChangeHistories(
      input.product_id
    );
  }
}
