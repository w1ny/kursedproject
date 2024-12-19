import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReadAppUserRepository {
  async getById(id: string) {
    try {
      return await prisma.appUser.findUnique({
        where: { id: id },
      });
    } catch (err) {
      console.error("Error retrieving AppUser by ID:", err);
      throw err;
    }
  }

  async getByUsername(username: string) {
    try {
      return await prisma.appUser.findUnique({
        where: { username },
      });
    } catch (err) {
      console.error("Error retrieving AppUser by username:", err);
      throw err;
    }
  }

  async getByEmail(email: string) {
    try {
      return await prisma.appUser.findUnique({
        where: { email },
      });
    } catch (err) {
      console.error("Error retrieving AppUser by email:", err);
      throw err;
    }
  }

  async getByLoginInfo(login: string) {
    try {
      return await prisma.appUser.findFirst({
        where: {
          OR: [{ email: login }, { username: login }],
        },
      });
    } catch (err) {
      console.error("Error retrieving AppUser by login info:", err);
      throw err;
    }
  }

  async getByLoginAndPassword(login: string, password: string) {
    try {
      return await prisma.appUser.findFirst({
        where: {
          AND: [
            { OR: [{ email: login }, { username: login }] },
            { password },
          ],
        },
      });
    } catch (err) {
      console.error("Error retrieving AppUser by login and password:", err);
      throw err;
    }
  }

  async getByUsernameOrEmailAndPassword(username: string, email: string, password: string) {
    try {
      return await prisma.appUser.findFirst({
        where: {
          AND: [
            { OR: [{ email }, { username }] },
            { password },
          ],
        },
      });
    } catch (err) {
      console.error("Error retrieving AppUser by username/email and password:", err);
      throw err;
    }
  }

  async getAll() {
    try {
      return await prisma.appUser.findMany();
    } catch (err) {
      console.error("Error retrieving all AppUsers:", err);
      throw err;
    }
  }
}
