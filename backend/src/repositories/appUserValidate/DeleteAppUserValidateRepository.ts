import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteAppUserValidateRepository {
  async deleteById(id: string) {
    try {
      const deletedToken = await prisma.appUserValidate.delete({
        where: { id: id },
      });
      console.log("Token deleted:", deletedToken);
      return deletedToken;
    } catch (err) {
      console.error("Error deleting appUserValidate token:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }

  async deleteExpiredTokens(expireTime: string) {
    try {
      const expireTimeInMs = Number(expireTime) * 60 * 1000;

      const deletedTokens = await prisma.appUserValidate.deleteMany({
        where: {
          createdAt: {
            lt: new Date(Date.now() - expireTimeInMs),
          },
        },
      });
      console.log("Expired tokens deleted:", deletedTokens.count);
      return deletedTokens.count;
    } catch (err) {
      console.error("Error deleting expired appUserValidate tokens:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}
