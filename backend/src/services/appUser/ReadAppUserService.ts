import { ReadAppUserRepository } from "../../repositories/appUser/ReadAppUserRepository";

export class ReadAppUserService {
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

	getByWalletAddress = async (walletAddress: string) => {
		try {
			const user = this.readAppUserRepository.getByWalletAddress(walletAddress);

			return user;
		} catch (err: any) {
			console.error("Get user details error:", err.message);
			throw new Error("Get user details error. Please check your credentials.");
		}
	};
}
