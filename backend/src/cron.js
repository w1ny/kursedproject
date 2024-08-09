import cron from "node-cron";
import { DeleteUserConfirmationService } from "./services/UserConfirmationService";

cron.schedule("0 0 * * *", async () => {
	const deleteExpiredUserConfirmationTokens = new DeleteUserConfirmationService();
	console.log("Running scheduled task deleteExpired... ");
	try {
		deleteExpiredUserConfirmationTokens.deleteExpired();
	} catch (err) {
		console.error("Error running scheduled tasks:", err);
	}
});
