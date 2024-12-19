import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteAppUserRepository {
  async deleteById(id: string) {
    try {
      const deletedUser = await prisma.appUser.delete({
        where: { id: id },
      });
      console.log("AppUser deleted:", deletedUser);
      return deletedUser;
    } catch (err) {
      console.error("Error deleting AppUser:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}
