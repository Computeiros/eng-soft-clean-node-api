import { AddAccountRepository, GetAccountRepository } from '@/data/contracts';
import { prisma } from '@/infra/db/helpers';

export class AccountPrismaRepository implements AddAccountRepository, GetAccountRepository {
  async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const result = await prisma.account.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        plan: data.plan,
      },
    });
    return {
      id: result.id,
    };
  }

  async get(data: GetAccountRepository.Params): Promise<GetAccountRepository.Result> {
    const { id } = data;
    const result = await prisma.account.findFirst({ where: { id } });
    return {
      id,
      name: result.name,
      email: result.email,
      plan: result.plan,
    };
  }
}
