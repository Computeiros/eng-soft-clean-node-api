import { BaseController } from '@/presentation/protocols';
import { AccountPrismaRepository } from '@/infra';
import { InfoController } from '@/presentation/controller/account/info.controller';
import { GetAccountService } from '@/data/services/account/get-account.service';

export const makeInfoController = (): BaseController => {
  const accountRepository = new AccountPrismaRepository();

  const getAccount = new GetAccountService(
    accountRepository,
  );

  return new InfoController(getAccount);
};
