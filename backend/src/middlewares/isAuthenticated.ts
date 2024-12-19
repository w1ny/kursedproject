import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
	sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	try {
		const authToken = req.headers.authorization;

		if (!authToken) return res.status(401).end();

		const [, token] = authToken.split(" ");
		const { sub } = verify(token, process.env.JWT_SECRET!) as Payload;

		req.appuserid = sub;

		return next();
	} catch (err: any) {
		console.error("Authentication error:", err.message);
		throw new Error("Authentication failed. Please check your credentials.");
	}
}
