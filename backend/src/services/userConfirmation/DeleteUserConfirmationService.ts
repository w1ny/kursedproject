import { DeleteUserConfirmationRepository } from "../../repositories/userConfirmation/DeleteUserConfirmationRepository";
import { LoadConfig } from "../../utils/configLoader";

export class DeleteUserConfirmationService {
	async execute(confirmationId: string) {
		const deleteUserConfirmationRepository = new DeleteUserConfirmationRepository();

		try {
			const user = await deleteUserConfirmationRepository.query(confirmationId);
			return user;
		} catch (err: any) {
			console.error("Error deleting user confirmation:", err);
			throw err;
		}
	}

	async deleteExpired() {
		const loadConfig = new LoadConfig();
		const appConfig = await loadConfig.getAppConfig(); 
		const deleteUserConfirmationRepository = new DeleteUserConfirmationRepository();

		try {
			const deleteExpiredTokens = await deleteUserConfirmationRepository.deleteExpiredTokens(String(appConfig.confirmationExpiryDays));
			return deleteExpiredTokens;
		} catch (err: any) {
			console.error("Error deleting user confirmation:", err);
			throw err;
		}
	}
}
