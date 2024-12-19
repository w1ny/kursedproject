import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { AppUserValidateInterface } from "../../model/appUserValidate/AppUserValidate";

const prisma = new PrismaClient();

export class CreateAppUserValidateRepository {
  async query({ username, email, password, token }: AppUserValidateInterface) {
    try {
      const confirmation = await prisma.appUserValidate.create({
        data: {
          id: uuidv4(),
          username,
          email,
          password,
          token: token,
        },
        select: {
          id: true,
          username: true,
          email: true,
          token: true,
          createdAt: true,
        },
      });

      return confirmation;
    } catch (err) {
      console.error("Error creating user validate:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}
