import { Request, Response } from "express";
import { CreateAccountConfirmationService } from "../../services/accountConfirmation/CreateAccountConfirmationService";
import crypto from "crypto";

function generateConfirmationToken() {
	return crypto.randomBytes(32).toString("hex");
}

export class CreateAccountConfirmationController {
	async handle(req: Request, res: Response) {
		const { username, email } = req.body;
		const createAccountConfirmationService = new CreateAccountConfirmationService();

		try {
			const token = generateConfirmationToken();
			const AccountConfirmation = await createAccountConfirmationService.execute({ username, email, token });

			if (AccountConfirmation !== null) {
				try {
					await createAccountConfirmationService.sendEmail({ username, email, token });
				} catch (err: any) {}
			}

			res.status(201).json(AccountConfirmation);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}
