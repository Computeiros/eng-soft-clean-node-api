import { AddAccountRepository, Hasher } from '@/data/contracts';
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
  let hasher : Hasher;

  beforeAll(() => {
    addAccountRepository = {
      add: jest.fn(async () => Promise.resolve({ id: 'any_id' })),
    };

    hasher = {
      hash: jest.fn(async () => Promise.resolve('any_hash')),
    };
  });

  beforeEach(() => {
    sut = new AddAccountService(addAccountRepository, hasher);
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
      password: 'any_hash',
      plan,
    });
  });

  it('should return id if called successfully', async () => {
    const { id } = await sut.add(mockAddAccountParams());

    expect(id).toBe('any_id');
  });

  it('should throw if hasher throws', async () => {
    hasher.hash = jest.fn(async () => Promise.reject(new Error('any_error')));

    await expect(sut.add(mockAddAccountParams())).rejects.toThrow();

    expect(hasher.hash).toHaveBeenCalledWith('any_password');
  });

  it('should throw if addAccountRepository throws', async () => {
    addAccountRepository.add = jest.fn(async () => Promise.reject(new Error('any_error')));

    await expect(sut.add(mockAddAccountParams())).rejects.toThrow();
  });
});
