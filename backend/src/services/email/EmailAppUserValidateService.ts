import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ReadConfigurationService } from "../configuration/ReadConfigurationService";

export class SendEmailAppUserValidateService {
	private readConfigurationService: ReadConfigurationService;

	constructor() {
		this.readConfigurationService = new ReadConfigurationService();
	}

	async getTransporter(): Promise<Transporter> {
		const emailConfig = await this.readConfigurationService.getEmailConfig();

		return nodemailer.createTransport({
			service: emailConfig.service,
			auth: emailConfig.auth,
		} as SMTPTransport.Options);
	}

	async sendEmail(email: string, subject: string, emailBody: string): Promise<void> {
		try {
			const emailConfig = await this.readConfigurationService.getEmailConfig();
			const transporter = await this.getTransporter();

			await transporter.sendMail({
				from: emailConfig.from,
				to: email,
				subject: subject,
				html: emailBody,
			});

			console.log("Email sent successfully");
		} catch (err: any) {
			console.error("Error sending email:", err);
			throw new Error("Failed to send email");
		}
	}
}
