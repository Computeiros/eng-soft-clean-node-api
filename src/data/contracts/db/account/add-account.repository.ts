import { AddAccount } from '@/domain/services/account/add-account';

export interface AddAccountRepository {
  add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result>;
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params;
  export type Result = AddAccount.Result;
}
