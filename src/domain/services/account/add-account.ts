export type AddAccountParams = {
  name: string;
  email: string;
  password: string;
  plan: 'Free' | 'Premium' | 'VIP';
};

export namespace AddAccount {
  export type Params = AddAccountParams;
  export type Result = {
    id: string
  };
}

export interface AddAccount {
  add(addAccountParams: AddAccount.Params): Promise<AddAccount.Result>;
}
