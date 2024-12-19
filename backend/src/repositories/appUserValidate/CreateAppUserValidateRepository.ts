import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

interface AppUserValidate {
	username: string;
	email: string;
	password: string;
	token: string;
}

export class CreateAppUserValidateRepository {
	query = async ({ username, email, password, token }: AppUserValidate) => {
		try {
			const confirmation = await prisma.appUserValidate.create({
				data: {
					id: uuidv4(),
					username,
					email,
					password,
					token: token,
				},
				select: {
					id: true,
					username: true,
					email: true,
					token: true,
					createdAt: true,
				},
			});

			return confirmation;
		} catch (err) {
			console.error("Error creating user validate:", err);
			throw err;
		} finally {
			await prisma.$disconnect();
		}
	};
}
