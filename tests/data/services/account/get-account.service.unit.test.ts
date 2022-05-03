import { GetAccountRepository } from '@/data/contracts';
import { GetAccountService } from '@/data/services/account';

const params = {
  id: '1',
};
describe('GetAccountService', () => {
  let sut: GetAccountService;
  let getAccountRepository : GetAccountRepository;

  beforeAll(() => {
    getAccountRepository = {
      get: jest.fn(async () => Promise.resolve({
        id: '1',
        email: 'fake@email.com',
        plan: 'Free',
        name: 'Fake Name',
      })),
    };
  });

  beforeEach(() => {
    sut = new GetAccountService(getAccountRepository);
  });

  it('should call GetAccountRepository with correct params', async () => {
    await sut.get(params);

    expect(getAccountRepository.get).toHaveBeenCalledWith(params);
  });

  it('should return correct data', async () => {
    const response = await sut.get(params);

    expect(response).toEqual({
      id: '1',
      email: 'fake@email.com',
      plan: 'Free',
      name: 'Fake Name',
    });
  });
});
