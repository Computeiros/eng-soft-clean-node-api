export type GetAccountParams = {
  id: string
};

export namespace GetAccount {
  export type Params = GetAccountParams;
  export type Result = {
    id: string
    name: string
    email: string
    plan: string
  };
}

export interface GetAccount {
  get(params: GetAccountParams): Promise<GetAccount.Result>
}
