import { AddAccountRepository } from '@/data/contracts';
import { prisma } from '@/infra/db/helpers';

export class AccountPrismaRepository implements AddAccountRepository {
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
}
