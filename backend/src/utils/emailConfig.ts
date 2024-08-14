import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { LoadConfig } from "./configLoader";

export const getTransporter = async () => {
	const loadConfig = new LoadConfig();
	const emailConfig = await loadConfig.getEmailConfig();

	const transporter = nodemailer.createTransport({
		service: emailConfig.service,
		auth: emailConfig.auth,
	  } as SMTPTransport.Options);

	return transporter;
};

export const sendEmail = async (email: string, subject: string, emailBody: string) => {
	const loadConfig = new LoadConfig();
	const transporter = await getTransporter();
	const emailConfig = await loadConfig.getEmailConfig();

	try {
		await transporter.sendMail({
			from: emailConfig.from,
			to: email,
			subject: subject,
			html: emailBody,
		});
		console.log("Email sent successfully");
	} catch (err: any) {
		console.error("Error sending email:", err);
		throw err;
	}
};
