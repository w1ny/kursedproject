import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReadConfigurationRepository {
  async getValueByKey(key: string): Promise<string | null> {
    try {
      const config = await prisma.configuration.findUnique({
        where: { key },
      });

      return config ? config.value : null;
    } catch (err) {
      console.error("Error retrieving configuration:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}
