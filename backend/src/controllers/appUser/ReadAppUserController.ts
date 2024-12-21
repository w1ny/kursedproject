import { Request, Response } from "express";
import { ReadAppUserService } from "../../services/appUser/ReadAppUserService";

export class ReadAppUserController {
	private readAppUserService: ReadAppUserService;

	constructor() {
		this.readAppUserService = new ReadAppUserService();
	}

	handle = async (req: Request, res: Response) => {
		try {
			const walletAddress = req.walletaddress;
			const user = await this.readAppUserService.getByWalletAddress(walletAddress);

			return res.status(200).json(user);
		} catch (err: any) {
			console.error("Get user details error:", err.message);
			throw new Error("Get user details error. Please check your credentials.");
		}
	};
}
