import { GetAccount } from '@/domain/services/account';

export interface GetAccountRepository {
  get(data: GetAccountRepository.Params): Promise<GetAccountRepository.Result>;
}

export namespace GetAccountRepository {
  export type Params = GetAccount.Params;
  export type Result = GetAccount.Result;
}
