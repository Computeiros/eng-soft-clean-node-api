import { GetAccountRepository } from '@/data/contracts';
import { GetAccount } from '@/domain/services/account';

export class GetAccountService implements GetAccount {
  constructor(
    private readonly getAccountRepository: GetAccountRepository,
  ) {}

  async get(data: GetAccount.Params): Promise<GetAccount.Result> {
    const { id } = data;

    const response = await this.getAccountRepository.get({ id });

    return {
      id: response.id,
      email: response.email,
      plan: response.plan,
      name: response.name,
    };
  }
}
