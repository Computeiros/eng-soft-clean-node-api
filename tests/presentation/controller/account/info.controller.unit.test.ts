import { GetAccount } from '@/domain/services/account';
import { InfoController } from '@/presentation/controller/account';
import { MissingParamsError } from '@/presentation/errors';
import { badRequest, internalServerError, success } from '@/presentation/helpers/http.helpers';

describe('InfoController', () => {
  let sut: InfoController;
  let getAccount: GetAccount;

  beforeAll(() => {
    getAccount = {
      get: jest.fn(async () => Promise.resolve({
        id: '1',
        email: 'teste@fake.com',
        plan: 'Free',
        name: 'Fake Name',
      })),
    };
  });

  beforeEach(() => {
    sut = new InfoController(getAccount);
  });

  it('should call GetAccount with correct params', async () => {
    await sut.handle({ id: '1' });

    expect(getAccount.get).toHaveBeenCalledWith({ id: '1' });
  });

  it('should return correct data', async () => {
    const response = await sut.handle({ id: '1' });

    expect(response).toEqual(success({
      id: '1',
      email: 'teste@fake.com',
      plan: 'Free',
      name: 'Fake Name',
    }));
  });

  it('should return a internalServerError if getAccount throws', async () => {
    getAccount.get = jest.fn(async () => Promise.reject(new Error()));

    const response = await sut.handle({ id: '1' });

    expect(response).toEqual(internalServerError(new Error()));
  });

  it('should throw MissingParamsError if id is not provided', async () => {
    const response = await sut.handle({ id: '' });

    expect(response).toEqual(badRequest(new MissingParamsError()));
  });
});
