import { mockAddAccountParams } from '@/tests/domain/mocks/account.mock';
import { AccountPrismaRepository } from '@/infra/db/prisma/account/account-prisma.repository';
import { prisma } from '@/infra/db/helpers';

const makeSut = (): AccountPrismaRepository => new AccountPrismaRepository();

describe('AccountPrismaRepository', () => {
  beforeEach(async () => {
    await prisma.account.deleteMany({});
  });

  afterAll(async () => {
    const deleteAccount = prisma.account.deleteMany();

    await prisma.$transaction([
      deleteAccount,
    ]);

    prisma.$disconnect();
  });

  it('should return account on add success ', async () => {
    const sut = makeSut();

    const request = mockAddAccountParams();
    const account = await sut.add(request);

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
  });
});
