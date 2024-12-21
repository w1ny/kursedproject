import { Request, Response, NextFunction } from "express";
import { ReadAppUserService } from "../services/appUser/ReadAppUserService";

export const verifyWalletConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const walletAddress = req.headers.walletaddress as string;

        if (!walletAddress) {
            return res.status(401).json({ error: "Wallet address is required." });
        }

        const readAppUserService = new ReadAppUserService();
        const user = await readAppUserService.getByWalletAddress(walletAddress);

        if (!user) {
            return res.status(401).json({ error: "User is not connected. Please log in." });
        }

        req.body.user = user;
        next();
    } catch (err) {
        console.error("Error verifying wallet connection:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};
