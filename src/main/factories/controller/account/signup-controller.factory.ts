import { AddAccountService } from '@/data/services/account/';
import { BcryptAdapter } from '@/infra/cryptography';
import { AccountPrismaRepository } from '@/infra/db/prisma/account/account-prisma.repository';
import { NodeMailerAdapter } from '@/infra/email/nodemailer-adapter';
import { env } from '@/main/config/env';
import { SignUpController } from '@/presentation/controller/account/signup.controller';
import { BaseController } from '@/presentation/protocols';

export const makeSignUpController = (): BaseController => {
  const salt = 12;

  const addAccountRepository = new AccountPrismaRepository();

  const addAccount = new AddAccountService(
    addAccountRepository,
  );

  return new SignUpController(addAccount);
};
