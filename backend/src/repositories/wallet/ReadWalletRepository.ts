import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReadWalletRepository {
	async findByAddress(address: string) {
		try {
			const wallet = await prisma.wallet.findUnique({
				where: { address },
				select: { id: true, address: true },
			});
			return wallet;
		} catch (err) {
			console.error("Error finding wallet by address:", err);
			throw new Error("Failed to find wallet.");
		} finally {
			await prisma.$disconnect();
		}
	}
}
