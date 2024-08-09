import { RetrieveConfigService } from "../services/config/RetrieveConfigService";

export class LoadConfig {
	private retrieveConfigService: RetrieveConfigService;

	constructor() {
		this.retrieveConfigService = new RetrieveConfigService();
	}

	async getEmailConfig() {
		const emailConfig = {
			service: await this.retrieveConfigService.execute("emailService"),
			auth: {
				user: await this.retrieveConfigService.execute("emailUser"),
				pass: await this.retrieveConfigService.execute("emailPass"),
			},
			from: await this.retrieveConfigService.execute("emailFrom"),
		};
		return emailConfig;
	}

	async getConfirmEmailSubject() {
		return await this.retrieveConfigService.execute("confirmEmailSubject");
	}

	async getConfirmEmailBody(url: string, username: string) {
		const bodyTemplate = await this.retrieveConfigService.execute("confirmEmailBody");
		return bodyTemplate.replace("{{url}}", url).replace("{{username}}", username);
	}

	async getBaseUrl() {
		return await this.retrieveConfigService.execute("baseUrl");
	}

	async getconfirmationExpiryDays() {
		return Number(await this.retrieveConfigService.execute("confirmationExpiryDays"));
	}
}
