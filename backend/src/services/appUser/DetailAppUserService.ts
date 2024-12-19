import { ReadAppUserRepository } from "../../repositories/appUser/ReadAppUserRepository";

export class DetailAppUserService {
	private readAppUserRepository: ReadAppUserRepository;

	constructor() {
		this.readAppUserRepository = new ReadAppUserRepository();
	}

	execute = async (userId: string) => {
		try {
			const user = this.readAppUserRepository.getById(userId);

			return user;
		} catch (err: any) {
			console.error("Get user details error:", err.message);
			throw new Error("Get user details error. Please check your credentials.");
		}
	};
}
