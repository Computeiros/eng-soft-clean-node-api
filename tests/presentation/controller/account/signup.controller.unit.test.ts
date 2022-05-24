import { Prisma } from '@prisma/client';
import { AddAccount } from '@/domain/services/account/add-account';
import { MissingParamsError } from '@/presentation/errors/missing-params.error';
import { badRequest, internalServerError, success } from '@/presentation/helpers/http.helpers';
import { SignUpController } from '@/presentation/controller/account';

const request = {
  email: 'any_email',
  name: 'any_name',
  password: 'any_password',
  plan: 'Free',
} as AddAccount.Params;
describe('SignUpController', () => {
  let sut: SignUpController;
  let addAccount: AddAccount;

  beforeAll(() => {
    addAccount = {
      add: jest.fn(async () => Promise.resolve({ id: 'any_id' })),
    };
  });

  beforeEach(() => {
    sut = new SignUpController(addAccount);
  });
  it('should call AddAccount with correct values', async () => {
    await sut.handle(request);
    expect(addAccount.add).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      plan: 'Free',
    });
  });

  it('should return bad request if required params are not provided', async () => {
    const fakeErrorRequest = {
      email: 'any_email',
      name: undefined,
      password: 'any_password',
      plan: undefined,
    };

    const httpResponse = await sut.handle(fakeErrorRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamsError()));
  });

  it('should return response status success if receive correct params', async () => {
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(success({
      id: 'any_id',
    }));
  });

  it('should return internal server error if AddAccount throws prisma error P2002', async () => {
    addAccount.add = jest.fn(async () => Promise.reject(new Prisma.PrismaClientKnownRequestError('There is a unique constraint violation, email already exists', 'P2002', '')));
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(internalServerError(
      new Error('There is a unique constraint violation, email already exists'),
    ));
  });
});
