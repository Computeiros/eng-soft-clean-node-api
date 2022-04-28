import { GetAccount } from '@/domain/services/account';
import { MissingParamsError } from '@/presentation/errors/missing-params.error';
import {
  badRequest,
  internalServerError,
  success,
} from '@/presentation/helpers/http.helpers';
import { BaseController } from '@/presentation/protocols/base-controller';
import { HttpResponse } from '@/presentation/protocols/http';

namespace InfoController {
  export type Request = {
    id: string;
  };
}
export class InfoController
implements BaseController<InfoController.Request> {
  constructor(private readonly getAccount: GetAccount) {}

  async handle(data: InfoController.Request): Promise<HttpResponse> {
    try {
      this.validatePayload(data);
      const account = await this.getAccount.get(data);

      return success({
        id: account.id,
        name: account.name,
        email: account.email,
        plan: account.plan,
      });
    } catch (error) {
      if (error instanceof MissingParamsError) {
        return badRequest(error);
      }

      return internalServerError(error as Error);
    }
  }

  private validatePayload(data: InfoController.Request): void {
    const { id } = data;

    if (!id) {
      throw new MissingParamsError();
    }
  }
}
