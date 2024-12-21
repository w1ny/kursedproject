import { Request, Response } from "express";

export class DashboardController {
    handle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = req.body.user;

            return res.status(200).json({
                message: "Welcome to the dashboard!",
                user,
            });
        } catch (err: any) {
            console.error("Error in DashboardController:", err.message);
            return res.status(500).json({ error: "Internal server error." });
        }
    };
}
