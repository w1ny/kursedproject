import { CreateAppUserRepository } from "../../repositories/appUser/CreateAppUserRepository";
import { ReadAppUserRepository } from "../../repositories/appUser/ReadAppUserRepository";

export interface AppUser {
	username: string;
	walletId: string;
}

export class CreateAppUserService {
	private createAppUserRepository: CreateAppUserRepository;
	private readAppUserRepository: ReadAppUserRepository;

	constructor() {
		this.createAppUserRepository = new CreateAppUserRepository();
		this.readAppUserRepository = new ReadAppUserRepository();
	}

	async execute({ username, walletId }: AppUser) {
		try {
			if (!username || !walletId) {
				throw new Error("Username and walletId are required.");
			}

			const existingUser = await this.readAppUserRepository.findByWalletId(walletId);
			if (existingUser) {
				throw new Error("A user with this wallet already exists.");
			}

			const account = await this.createAppUserRepository.create({
				username,
				walletId,
			});

			return account;
		} catch (err: any) {
			console.error("Error creating AppUser:", err.message);
			throw new Error("Failed to create user. Please try again later.");
		}
	}
}
