import { Account } from '@prisma/client';
import supertest from 'supertest';
import { prisma } from '@/infra/db/helpers';
import { app } from '@/main/config/app';

let testAccount: Account;

describe('InfoController (Integration)', () => {
  beforeAll(async () => {
    testAccount = await prisma.account.create({
      data: { name: 'test', plan: 'Free', email: 'test@test.com' },
    });
  });

  afterAll(async () => {
    await prisma.account.delete({ where: { id: testAccount.id } });
  });

  test('GET:/info/:id', async () => {
    const response = await supertest(app).get(`/api/info/${testAccount.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(testAccount.id);
    expect(response.body.name).toBe(testAccount.name);
    expect(response.body.email).toBe(testAccount.email);
    expect(response.body.plan).toBe(testAccount.plan);
  });
});
