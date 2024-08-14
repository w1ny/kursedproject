import { Request, Response } from "express";
import { UpdateAccountConfirmationService } from "../../services/accountConfirmation/UpdateAccountConfirmationService";

export class UpdateAccountConfirmationController {
	async handle(req: Request, res: Response) {
		const { token } = req.query;
		const updateAccountConfirmationService = new UpdateAccountConfirmationService();

		if (typeof token !== "string") {
			return res.status(400).json({ error: "Invalid or missing token" });
		}

		try {
			const account = await updateAccountConfirmationService.execute(token);

			res.status(201).json(account);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}
