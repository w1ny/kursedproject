import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReadAppUserRepository {
	getById = async (id: string) => {
		try {
			return await prisma.appUser.findUnique({
				where: { id: id },
				select: {
					id: true,
					username: true,
					walletId: true,
				},
			});
		} catch (err) {
			console.error("Error retrieving AppUser by ID:", err);
			throw err;
		}
	};

	getByUsername = async (username: string) => {
		try {
			return await prisma.appUser.findUnique({
				where: { username },
			});
		} catch (err) {
			console.error("Error retrieving AppUser by username:", err);
			throw err;
		}
	};

	findByWalletId = async (walletId: string) => {
		try {
			return await prisma.appUser.findUnique({
				where: { walletId },
			});
		} catch (err) {
			console.error("Error retrieving AppUser by username:", err);
			throw err;
		}
	};

	getByWalletAddress = async (walletAddress: string) => {
		try {
			return await prisma.appUser.findFirst({
				where: {
					wallet: {
						address: walletAddress,
					},
				},
				select: {
					id: true,
					username: true,
					walletId: true,
					wallet: {
						select: {
							address: true,
						},
					},
				},
			});
		} catch (err) {
			console.error("Error retrieving AppUser by wallet address:", err);
			throw err;
		}
	};

	getAll = async () => {
		try {
			return await prisma.appUser.findMany();
		} catch (err) {
			console.error("Error retrieving all AppUsers:", err);
			throw err;
		}
	};
}
