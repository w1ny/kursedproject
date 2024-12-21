import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

interface AppUser {
	username: string;
	walletId: string;
}

export class CreateAppUserRepository {
	async create({ username, walletId }: AppUser) {
		try {
			const appUser = await prisma.appUser.create({
				data: {
					id: uuidv4(),
					username,
					walletId,
					type: "user",
				},
				select: {
					id: true,
					username: true,
					walletId: true,
					type: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			console.log("AppUser created:", appUser);
			return appUser;
		} catch (err) {
			console.error("Error creating AppUser:", err);
			throw new Error("Failed to create AppUser.");
		} finally {
			await prisma.$disconnect();
		}
	}
}
