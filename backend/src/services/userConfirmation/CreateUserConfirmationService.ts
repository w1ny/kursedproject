import { CreateUserConfirmationRepository } from "../../repositories/userConfirmation/CreateUserConfirmationRepository";
import { UserConfirmationInterface } from "../../model/userConfirmation/UserConfirmation";
import { LoadConfig } from "../../utils/configLoader";
import { sendEmail } from "../../utils/emailConfig";

export class CreateUserConfirmationService {
	async execute({ username, email, token }: UserConfirmationInterface) {
		const createUserConfirmationRepository = new CreateUserConfirmationRepository();

		try {
			const userConfirmation = await createUserConfirmationRepository.query({ username, email, token });
			return userConfirmation;
		} catch (err: any) {
			console.error("Error creating user confirmation:", err);
			throw err;
		}
	}
	async sendEmail({ username, email, token }: UserConfirmationInterface) {
		const loadConfig = new LoadConfig();
		const baseUrl = await loadConfig.getBaseUrl();
		const confirmEmailSubject = await loadConfig.getConfirmEmailSubject();

		const url = `${baseUrl}/confirm?token=${token}`;

		const emailBody = await loadConfig.getConfirmEmailBody(url, username);

		sendEmail(email, confirmEmailSubject, emailBody);
	}
}
