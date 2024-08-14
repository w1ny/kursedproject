import { DeleteAccountConfirmationRepository } from "../../repositories/accountConfirmation/DeleteAccountConfirmationRepository";
import { LoadConfig } from "../../utils/configLoader";

export class DeleteAccountConfirmationService {
	async execute(confirmationId: string) {
		const deleteAccountConfirmationRepository = new DeleteAccountConfirmationRepository();

		try {
			const account = await deleteAccountConfirmationRepository.query(confirmationId);
			return account;
		} catch (err: any) {
			console.error("Error deleting account confirmation:", err);
			throw err;
		}
	}

	async deleteExpired() {
		const loadConfig = new LoadConfig();		
		const deleteAccountConfirmationRepository = new DeleteAccountConfirmationRepository();

		try {
			const deleteExpiredTokens = await deleteAccountConfirmationRepository.deleteExpiredTokens(String(await loadConfig.getConfirmationExpiryDays()));
			return deleteExpiredTokens;
		} catch (err: any) {
			console.error("Error deleting account confirmation:", err);
			throw err;
		}
	}
}
