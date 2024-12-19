import { CreateAppUserValidateRepository } from "../../repositories/appUserValidate/CreateAppUserValidateRepository";
import { ReadAppUserRepository } from "../../repositories/appUser/ReadAppUserRepository";
import { ReadConfigurationService } from "../configuration/ReadConfigurationService";
import { SendEmailAppUserValidateService } from "../email/EmailAppUserValidateService";
import { hash } from "bcryptjs";
import crypto from "crypto";

interface AppUserValidate {
	username: string;
	email: string;
	password: string;
}

interface ValidationEmail {
	username: string;
	email: string;
	token: string;	
}

export class CreateAppUserValidateService {
	private createAppUserValidateRepository: CreateAppUserValidateRepository;
	private emailAppUserValidateService: SendEmailAppUserValidateService;

	constructor() {
		this.createAppUserValidateRepository = new CreateAppUserValidateRepository();
		this.emailAppUserValidateService = new SendEmailAppUserValidateService();
	}

	execute = async ({ username, email, password }: AppUserValidate) => {
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

			// if (userValidation) {
			// 	try {
			// 		await this.sendEmail({ username, email, token });
			// 	} catch (err: any) {
			// 		console.error("Error sending validation email:", err.message);
			// 		throw new Error("Failed to send validation email.");
			// 	}
			// }

			return userValidation;
		} catch (err: any) {
			console.error("Error creating user validation:", err.message);
			throw new Error("Failed to create user validation.");
		}
	};

	sendEmail = async ({ username, email, token }: ValidationEmail) => {
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

	private validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	private validateUserInput = async (email: string, password: string, username: string) => {
		const readAppUserRepository = new ReadAppUserRepository();

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
