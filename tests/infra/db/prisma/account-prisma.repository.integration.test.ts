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
  describe('add', () => {
    it('should return account on add success ', async () => {
      const sut = makeSut();

      const request = mockAddAccountParams();
      const account = await sut.add(request);

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
    });

    it('should throw if prisma throws', () => {
      jest.spyOn(prisma.account, 'create').mockRejectedValueOnce(new Error());
      const sut = makeSut();

      const request = mockAddAccountParams();
      const promise = sut.add(request);

      expect(promise).rejects.toThrow();
    });
  });

  describe('get', () => {
    it('should return account on get success ', async () => {
      const sut = makeSut();

      const request = mockAddAccountParams();
      const addedAccount = await sut.add(request);

      const account = await sut.get({ id: addedAccount.id });

      expect(account).toBeTruthy();
      expect(account).toEqual({
        id: addedAccount.id,
        name: request.name,
        email: request.email,
        plan: request.plan,
      });
    });

    it('should throw if prisma throws', () => {
      jest.spyOn(prisma.account, 'findFirst').mockRejectedValueOnce(new Error());
      const sut = makeSut();

      const promise = sut.get({ id: '1' });

      expect(promise).rejects.toThrow();
    });
  });
});
