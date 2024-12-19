import { CreateAppUserRepository } from "../../repositories/appUser/CreateAppUserRepository";
import { AppUserInterface } from "../../model/appUser/AppUser";

export class CreateAppUserService {
	private createAppUserRepository: CreateAppUserRepository;

	constructor() {
		this.createAppUserRepository = new CreateAppUserRepository();
	}

	async execute({ username, email, password, nickname, walletId }: Omit<AppUserInterface, "id">) {
		try {
			if (!username || !email || !password || !nickname) {
				throw new Error("All fields (username, email, password, and nickname) are required.");
			}

			const account = await this.createAppUserRepository.create({
				username,
				email,
				password,
				nickname,
				walletId: walletId || null,
			});

			return account;
		} catch (err: any) {
			console.error("Error creating AppUser:", err.message);
			throw new Error("Failed to create user. Please try again later.");
		}
	}
}
