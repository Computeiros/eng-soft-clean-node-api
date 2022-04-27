export type AccountModel = {
  id: string;
  name: string;
  password?: string;
  email: string;
  createdAt?: Date;
  plan: 'FREE' | 'PREMIUM' | 'VIP';
};
