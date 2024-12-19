import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import router from "./routes";
import "./utils/cron";

const app = express();
const port = 7777;

let config: any;

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		return res.status(400).json({
			error: err.message,
		});
	}

	return res.status(500).json({
		status: "Error",
		message: "Internal Server Error",
	});
});

app.listen(port, () => console.log(`Server Online on http://localhost:${port}`));
