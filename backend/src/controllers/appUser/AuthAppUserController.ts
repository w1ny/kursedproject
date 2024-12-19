import { Request, Response } from "express";
import { AuthAppUserService } from "../../services/appUser/AuthAppUserService";

export class AuthAppUserController {
	private authAppUserService: AuthAppUserService;

	constructor() {
		this.authAppUserService = new AuthAppUserService();
	}

	handle = async (req: Request, res: Response): Promise<Response> => {
		try {
			const { login, password } = req.body;

			if (!login || !password) {
				return res.status(400).json({ error: "Login and password are required." });
			}
			
			const auth = await this.authAppUserService.execute({ login, password });

			return res.status(200).json(auth);
		} catch (err: any) {
			console.error("Error in AuthAppUserController:", err);
			return res.status(500).json({ error: err.message });
		}
	};
}
