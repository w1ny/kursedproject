import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReadAppUserValidateRepository {
  async getById(id: string) {
    try {
      const validation = await prisma.appUserValidate.findUnique({
        where: { id: id },
      });
      console.log("Validation record retrieved by ID:", validation);
      return validation;
    } catch (err) {
      console.error("Error retrieving validation by ID:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getByToken(token: string) {
    try {
      const validation = await prisma.appUserValidate.findUnique({
        where: { token: token },
      });
      console.log("Validation record retrieved by token:", validation);
      return validation;
    } catch (err) {
      console.error("Error retrieving validation by token:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}
