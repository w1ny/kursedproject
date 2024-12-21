import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CreateWalletRepository {
	async create(walletData: any) {
		try {
			const wallet = await prisma.wallet.create({
				data: walletData,
				select: {
					id: true,
					address: true,
					network: true,
					balance: true,
					networkType: true,
					clientVersion: true,
				},
			});
			console.log("Wallet created:", wallet);
			return wallet;
		} catch (err) {
			console.error("Error creating wallet:", err);
			throw new Error("Failed to create wallet.");
		} finally {
			await prisma.$disconnect();
		}
	}
}
