import { AddAccount } from '@/domain/services/account/add-account';
import { MissingParamsError } from '@/presentation/errors/missing-params.error';
import { badRequest, internalServerError, success } from '@/presentation/helpers/http.helpers';
import { BaseController } from '@/presentation/protocols/base-controller';
import { HttpResponse } from '@/presentation/protocols/http';

namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
    plan: 'Free' | 'Premium' | 'VIP';
  };
}
export class SignUpController implements BaseController<SignUpController.Request> {
  constructor(private readonly addAccount: AddAccount) {}

  async handle(data: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.validatePayload(data);
      const accountAdded = await this.addAccount.add(data);

      return success({
        id: accountAdded.id,
      });
    } catch (error) {
      if (error instanceof MissingParamsError) {
        return badRequest(error);
      }

      return internalServerError(error as Error);
    }
  }

  private validatePayload(data : SignUpController.Request): void {
    const {
      name, email, password, plan,
    } = data;

    if (!name || !email || !password || !plan) {
      throw new MissingParamsError();
    }
  }
}
