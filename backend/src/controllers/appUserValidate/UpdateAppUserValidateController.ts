import { Request, Response } from "express";
import { UpdateAppUserValidateService } from "../../services/appUserValidate/UpdateAppUserValidateService";

export class UpdateAppUserValidateController {
  private updateAppUserValidateService: UpdateAppUserValidateService;

  constructor() {
    this.updateAppUserValidateService = new UpdateAppUserValidateService();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { token, nickname, walletAddress } = req.query;

    if (!token || typeof token !== "string" || token.trim() === "") {
      return res.status(400).json({ error: "Invalid or missing token" });
    }

    if (!nickname || typeof nickname !== "string" || nickname.trim() === "") {
      return res.status(400).json({ error: "Invalid or missing nickname" });
    }

	let walletId: string | null = null;
    if (!walletAddress || typeof walletAddress !== "string" || walletAddress.trim() === "") {
      walletId = "";
    }

    try {
      const account = await this.updateAppUserValidateService.execute(
        token,
        nickname,
        walletId
      );

      return res.status(201).json(account);
    } catch (err: any) {
      console.error("Error in UpdateAppUserValidateController:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
