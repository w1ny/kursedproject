import { Request, Response } from "express";
import { CreateAppUserValidateService } from "../../services/appUserValidate/CreateAppUserValidateService";

export class CreateAppUserValidateController {
	private createAppUserValidateService: CreateAppUserValidateService;

	constructor() {
		this.createAppUserValidateService = new CreateAppUserValidateService();
	}

	async handle(req: Request, res: Response) {
		const { username, email, password } = req.body;
		try {
			if (!username || !email || !password) {
				return res.status(400).json({ error: "Login and password are required." });
			}

			const appUserValidate = await this.createAppUserValidateService.execute({ username, email, password });

			res.status(201).json(appUserValidate);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}
