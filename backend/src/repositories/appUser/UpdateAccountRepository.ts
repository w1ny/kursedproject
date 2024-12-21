import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UpdateAppUserRepository {
	async updateUserName(id: string, username: string) {
		try {
			const updatedUser = await prisma.appUser.update({
				where: { id },
				data: { username, updatedAt: new Date() },
			});
			console.log("AppUser updated:", updatedUser);
			return updatedUser;
		} catch (err) {
			console.error("Error updating AppUser:", err);
			throw err;
		}
	}
}
