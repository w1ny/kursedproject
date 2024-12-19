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
					nickname: true,
					email: true,
					walletId: true
				}
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

	getByEmail = async (email: string) => {
		try {
			return await prisma.appUser.findUnique({
				where: { email },
			});
		} catch (err) {
			console.error("Error retrieving AppUser by email:", err);
			throw err;
		}
	};

	getByLoginInfo = async (login: string) => {
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
	};

	getByLoginAndPassword = async (login: string, password: string) => {
		try {
			return await prisma.appUser.findFirst({
				where: {
					AND: [{ OR: [{ email: login }, { username: login }] }, { password }],
				},
			});
		} catch (err) {
			console.error("Error retrieving AppUser by login and password:", err);
			throw err;
		}
	};

	getByUsernameOrEmailAndPassword = async (username: string, email: string, password: string) => {
		try {
			return await prisma.appUser.findFirst({
				where: {
					AND: [{ OR: [{ email }, { username }] }, { password }],
				},
			});
		} catch (err) {
			console.error("Error retrieving AppUser by username/email and password:", err);
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
