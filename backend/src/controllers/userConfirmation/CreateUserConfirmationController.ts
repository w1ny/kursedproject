import { Request, Response } from "express";
import { CreateUserConfirmationService } from "../../services/userConfirmation/CreateUserConfirmationService";
import crypto from "crypto";

function generateConfirmationToken() {
	return crypto.randomBytes(32).toString("hex");
}

export class CreateUserConfirmationController {
	async handle(req: Request, res: Response) {
		const { username, email } = req.body;
		const createUserConfirmationService = new CreateUserConfirmationService();

		try {
			const token = generateConfirmationToken();
			const userConfirmation = await createUserConfirmationService.execute({ username, email, token });

			if (userConfirmation !== null) {
				await createUserConfirmationService.sendEmail({ username, email, token });
			}

			res.status(201).json(userConfirmation);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}
