import { CreateAppUserValidateRepository } from "../../repositories/appUserValidate/CreateAppUserValidateRepository";
import { ReadAppUserRepository } from "../../repositories/appUser/ReadAppUserRepository";
import { AppUserValidateInterface } from "../../model/appUserValidate/AppUserValidate";
import { ReadConfigurationService } from "../configuration/ReadConfigurationService";
import { SendEmailAppUserValidateService } from "../email/EmailAppUserValidateService";
import { hash } from "bcryptjs";
import crypto from "crypto";

export class CreateAppUserValidateService {
	private createAppUserValidateRepository: CreateAppUserValidateRepository;
	private emailAppUserValidateService: SendEmailAppUserValidateService;

	constructor() {
		this.createAppUserValidateRepository = new CreateAppUserValidateRepository();
		this.emailAppUserValidateService = new SendEmailAppUserValidateService();
	}

	async execute({ username, email, password }: Omit<AppUserValidateInterface, "token">) {
		await this.validateUserInput(email, password, username);

		try {
			const token = crypto.randomBytes(32).toString("hex");
			const hashedPassword = await hash(password, 8);

			const userValidation = await this.createAppUserValidateRepository.query({
				username,
				email,
				password: hashedPassword,
				token,
			});

			if (userValidation) {
				try {
					await this.sendEmail({ username, email, token });
				} catch (err: any) {
					console.error("Error sending account confirmation email:", err.message);
					throw new Error("Failed to send confirmation email.");
				}
			}

			return userValidation;
		} catch (err: any) {
			console.error("Error creating account confirmation:", err.message);
			throw new Error("Failed to create account validation.");
		}
	}

	async sendEmail({ username, email, token }: Omit<AppUserValidateInterface, "password">) {
		const readConfigService = new ReadConfigurationService();

		try {
			const baseUrl = await readConfigService.getBaseUrl();
			const confirmEmailSubject = await readConfigService.getValidationEmailSubject();
			const emailBody = await readConfigService.getValidationEmailBody(`${baseUrl}/confirm?token=${token}`, username);

			await this.emailAppUserValidateService.sendEmail(email, confirmEmailSubject, emailBody);
			console.log("Confirmation email sent successfully.");
		} catch (err: any) {
			console.error("Error sending email:", err.message);
			throw new Error("Failed to send confirmation email.");
		}
	}

	private validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	private async validateUserInput(email: string, password: string, username: string) {
		const readAppUserRepository = new ReadAppUserRepository();

		if (!email || !password || !username) {
			throw new Error("Check that all fields have been filled in.");
		}

		if (username.length > 20) {
			throw new Error("Username must have a maximum of 20 characters.");
		}

		if (!this.validateEmail(email)) {
			throw new Error("Please enter a valid email address.");
		}

		const usernameExists = await readAppUserRepository.getByUsername(username);
		const emailExists = await readAppUserRepository.getByEmail(email);

		if (usernameExists) {
			throw new Error("User already exists.");
		}

		if (emailExists) {
			throw new Error("Email already exists.");
		}
	}
}
