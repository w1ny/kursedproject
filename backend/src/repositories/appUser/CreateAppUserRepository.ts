import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { AppUserInterface } from "../../model/appUser/AppUser";

const prisma = new PrismaClient();

export class CreateAppUserRepository {
  async create({ username, email, password, nickname, walletId }: Omit<AppUserInterface, "id" >) {
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
