import { CreateUserRepository } from "../../repositories/user/CreateUserRepository";
import { UserInterface } from "../../model/user/User";

export class CreateUserService {
	async execute({ id, username, email, walletAddress }: UserInterface) {
		const createUserRepository = new CreateUserRepository();

		try {
			const user = createUserRepository.query({ id, username, email, walletAddress });
			return user;
		} catch (err: any) {}
	}
}
