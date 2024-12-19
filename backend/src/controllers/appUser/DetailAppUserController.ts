import { Request, Response } from "express";
import { DetailAppUserService } from "../../services/appUser/DetailAppUserService";

export class DetailAppUserController {
	private detailAppUserService: DetailAppUserService;

	constructor() {
		this.detailAppUserService = new DetailAppUserService();
	}

	handle = async (req: Request, res: Response) => {
		try {
			const userId = req.appuserid;
			const user = await this.detailAppUserService.execute(userId);

			return res.status(200).json(user);
		} catch (err: any) {
			console.error("Get user details error:", err.message);
			throw new Error("Get user details error. Please check your credentials.");
		}
	};
}
