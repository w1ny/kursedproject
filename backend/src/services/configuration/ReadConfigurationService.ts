import { ReadConfigurationRepository } from "../../repositories/configuration/ReadConfigurationRepository";

export class ReadConfigurationService {
	private readConfigurationRepository: ReadConfigurationRepository;

	constructor() {
		this.readConfigurationRepository = new ReadConfigurationRepository();
	}

	async getEmailConfig() {
		const emailConfig = {
			service: await this.execute("emailService"),
			auth: {
				account: await this.execute("emailAccount"),
				pass: await this.execute("emailPass"),
			},
			from: await this.execute("emailFrom"),
		};
		return emailConfig;
	}

	async getValidationEmailSubject() {
		return await this.execute("confirmEmailSubject");
	}

	async getValidationEmailBody(url: string, username: string) {
		const bodyTemplate = await this.execute("confirmEmailBody");
		return bodyTemplate.replace("{{url}}", url).replace("{{username}}", username);
	}

	async getBaseUrl() {
		return await this.execute("baseUrl");
	}

	async getValidationExpiryDays() {
		return Number(await this.execute("confirmationExpiryDays"));
	}

	private async execute(key: string): Promise<string> {
		try {
			const value = await this.readConfigurationRepository.getValueByKey(key);
			if (!value) {
				throw new Error(`Configuration key "${key}" not found.`);
			}
			return value;
		} catch (err: any) {
			console.error(`Error retrieving configuration key "${key}":`, err.message);
			throw err;
		}
	}
}
