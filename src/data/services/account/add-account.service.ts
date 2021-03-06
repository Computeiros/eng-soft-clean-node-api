import { AddAccountRepository, Hasher } from '@/data/contracts';
import { AddAccount } from '@/domain/services/account';

export class AddAccountService implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher,
  ) {}

  async add(data: AddAccount.Params): Promise<AddAccount.Result> {
    const {
      email, password, plan, name,
    } = data;

    const hashedPassword = await this.hasher.hash(password);

    const response = await this.addAccountRepository.add({
      name,
      email,
      password: hashedPassword,
      plan,
    });

    return {
      id: response.id,
    };
  }
}
