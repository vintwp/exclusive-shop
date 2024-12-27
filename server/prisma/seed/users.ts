import { User } from "@prisma/client";
import { prisma } from "./prismaClient";
import { hashPassword } from "../../lib";

type TInitialUsers = Array<Omit<User, 'id' | 'updatedAt' | 'createdAt'>>;

const initialUsers: TInitialUsers = [
  {
    name: 'Vitaliy',
    lastName: 'Pa',
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'ADMIN',
    oauthId: null,
    adress: null
  },
  {
    name: 'Antonio',
    lastName: 'Banderas',
    email: 'user@gmail.com',
    password: 'user',
    role: 'USER',
    oauthId: null,
    adress: null
  }
];

export async function createUsers() {
  await prisma.user.deleteMany();

  for (const user of initialUsers) {
    const hashedPassword = await hashPassword(user.password);

    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      }
    })
  }
}