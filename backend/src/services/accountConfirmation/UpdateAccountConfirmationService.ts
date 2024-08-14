import { DeleteAccountConfirmationRepository } from "../../repositories/accountConfirmation/DeleteAccountConfirmationRepository";
import { RetrieveAccountConfirmationRepository } from "../../repositories/accountConfirmation/RetrieveAccountConfirmationRepository";
import { CreateAccountRepository } from "../../repositories/account/CreateAccountRepository";

export class UpdateAccountConfirmationService {
	async execute(token: string) {
		const deleteAccountConfirmationRepository = new DeleteAccountConfirmationRepository();
		const retrieveAccountConfirmationRepository = new RetrieveAccountConfirmationRepository();
		const createAccountRepository = new CreateAccountRepository();

		try {
			const AccountConfirmation = await retrieveAccountConfirmationRepository.getAccountConfirmationByToken(token);

			if (!AccountConfirmation) {
				throw new Error("Invalid or expired token");
			}

			const account = await createAccountRepository.query({
				username: AccountConfirmation.username,
				email: AccountConfirmation.email,
				walletAddress: "",
			});

			await deleteAccountConfirmationRepository.query(AccountConfirmation.id);

			return account;
		} catch (err: any) {
			console.error("Error confirming account:", err);
			throw err;
		}
	}
}
