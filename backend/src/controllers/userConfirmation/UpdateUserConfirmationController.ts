import { Request, Response } from "express";
import { UpdateUserConfirmationService } from "../../services/userConfirmation/UpdateUserConfirmationService";

export class UpdateUserConfirmationController {
	async handle(req: Request, res: Response) {
		const { token } = req.query;
		const updateUserConfirmationService = new UpdateUserConfirmationService();

		if (typeof token !== "string") {
			return res.status(400).json({ error: "Invalid or missing token" });
		}

		try {
			const user = await updateUserConfirmationService.execute(token);

			res.status(201).json(user);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}
