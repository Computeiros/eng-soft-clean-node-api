import { AddAccountRepository } from '@/data/contracts';
import { AddAccountService } from '@/data/services/account/';
import { AddAccountParams } from '@/domain/services/account';

const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  plan: 'Free',
});

describe('AddAccountService', () => {
  let sut: AddAccountService;
  let addAccountRepository: AddAccountRepository;

  beforeAll(() => {
    addAccountRepository = {
      add: jest.fn(async () => Promise.resolve({ id: 'any_id' })),
    };
  });

  beforeEach(() => {
    sut = new AddAccountService(addAccountRepository);
  });

  it('should call AddAccountRepository with correct values', async () => {
    const {
      name, email, password, plan,
    } = mockAddAccountParams();

    await sut.add({
      name, email, password, plan,
    });

    expect(addAccountRepository.add).toHaveBeenCalledWith({
      name,
      email,
      password,
      plan,
    });
  });

  it('should return id if called successfully', async () => {
    const { id } = await sut.add(mockAddAccountParams());

    expect(id).toBe('any_id');
  });
});
