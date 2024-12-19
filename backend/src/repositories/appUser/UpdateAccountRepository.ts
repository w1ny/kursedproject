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

	async updateUserWallet(id: string, walletId: string) {
		try {
			const updatedUser = await prisma.appUser.update({
				where: { id: id },
				data: { walletId, updatedAt: new Date() },
			});
			console.log("AppUser wallet updated:", updatedUser);
			return updatedUser;
		} catch (err) {
			console.error("Error updating AppUser wallet:", err);
			throw err;
		}
	}

	async updatePassword(id: string, password: string) {
		try {
			const updatedUser = await prisma.appUser.update({
				where: { id: id },
				data: { password, updatedAt: new Date() },
			});
			console.log("AppUser password updated:", updatedUser);
			return updatedUser;
		} catch (err) {
			console.error("Error updating password:", err);
			throw err;
		}
	}

	async updateEmail(id: string, email: string) {
		try {
			const updatedUser = await prisma.appUser.update({
				where: { id: id },
				data: { email, updatedAt: new Date() },
			});
			console.log("AppUser email updated:", updatedUser);
			return updatedUser;
		} catch (err) {
			console.error("Error updating email:", err);
			throw err;
		}
	}

	async updateNickname(id: string, nickname: string) {
		try {
			const updatedUser = await prisma.appUser.update({
				where: { id: id },
				data: { nickname, updatedAt: new Date() },
			});
			console.log("AppUser nickname updated:", updatedUser);
			return updatedUser;
		} catch (err) {
			console.error("Error updating nickname:", err);
			throw err;
		}
	}
}
