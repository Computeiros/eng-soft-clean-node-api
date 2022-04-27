import { AddAccountRepository } from '@/data/contracts';
import { AddAccount } from '@/domain/services/account';

export class AddAccountService implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(data: AddAccount.Params): Promise<AddAccount.Result> {
    const {
      email, password, plan, name,
    } = data;

    const response = await this.addAccountRepository.add({
      name,
      email,
      password,
      plan,
    });

    return {
      id: response.id,
    };
  }
}
