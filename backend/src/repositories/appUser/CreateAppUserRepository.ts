import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export interface AppUser {
	username: string;
	email: string;
	password: string;
	nickname: string;
	walletId?: string | null;
}

export class CreateAppUserRepository {
  async create({ username, email, password, nickname, walletId }: AppUser) {
    try {
      const appUser = await prisma.appUser.create({
        data: {
          id: uuidv4(), 
          username,
          email,
          password,
          nickname,
          walletId,
        },
        select: {
          id: true,
          username: true,
          email: true,
          nickname: true,
          walletId: true
        }
      });

      console.log("AppUser created:", appUser);
      return appUser;
    } catch (err) {
      console.error("Error creating AppUser:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}
