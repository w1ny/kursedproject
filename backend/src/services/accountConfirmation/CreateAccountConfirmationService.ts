import { CreateAccountConfirmationRepository } from "../../repositories/accountConfirmation/CreateAccountConfirmationRepository";
import { AccountConfirmationInterface } from "../../model/accountConfirmation/AccountConfirmation";
import { LoadConfig } from "../../utils/configLoader";
import { sendEmail } from "../../utils/emailConfig";

export class CreateAccountConfirmationService {
	async execute({ username, email, token }: AccountConfirmationInterface) {
		const createAccountConfirmationRepository = new CreateAccountConfirmationRepository();

		try {
			const AccountConfirmation = await createAccountConfirmationRepository.query({ username, email, token });
			return AccountConfirmation;
		} catch (err: any) {
			console.error("Error creating account confirmation:", err);
			throw err;
		}
	}
	async sendEmail({ username, email, token }: AccountConfirmationInterface) {
		const loadConfig = new LoadConfig();
		const baseUrl = await loadConfig.getBaseUrl();
		const confirmEmailSubject = await loadConfig.getConfirmEmailSubject();

		const url = `${baseUrl}/confirm?token=${token}`;

		const emailBody = await loadConfig.getConfirmEmailBody(url, username);

		sendEmail(email, confirmEmailSubject, emailBody);
	}
}
