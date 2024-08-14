import { CreateAccountRepository } from "../../repositories/account/CreateAccountRepository";
import { AccountInterface } from "../../model/account/Account";

export class CreateAccountService {
	async execute({ id, username, email, walletAddress }: AccountInterface) {
		const createAccountRepository = new CreateAccountRepository();

		try {
			const account = createAccountRepository.query({ id, username, email, walletAddress });
			return account;
		} catch (err: any) {}
	}
}
