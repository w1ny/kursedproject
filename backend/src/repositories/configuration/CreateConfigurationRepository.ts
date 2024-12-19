import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export class CreateConfigurationRepository {
  async upsertConfig(key: string, value: string) {
    try {
      const config = await prisma.configuration.upsert({
        where: { key }, 
        update: { value }, 
        create: {
          id: uuidv4(), 
          key,
          value,
        }, 
      });

      console.log("Configuration upserted:", config);
      return config;
    } catch (err) {
      console.error("Error inserting/updating configuration:", err);
      throw err;
    } finally {
      await prisma.$disconnect();
    }
  }
}
