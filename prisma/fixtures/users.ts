import { faker } from '@faker-js/faker';
import { prisma } from '../../prisma/index';
import { User } from "@prisma/client";

export async function createRandomUser(): Promise<User> {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.internet.userName();
    const user = await prisma.user.create({ data: { email, password, name } });
    return user;
  };
