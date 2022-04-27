import { AddAccountParams } from '@/domain/services/account';

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  plan: 'Free',
});
