import cron from "node-cron";
import { DeleteAccountConfirmationService } from "./services/accountConfirmation/DeleteAccountConfirmationService";

cron.schedule("0 0 * * *", async () => {
	const deleteExpiredAccountConfirmationTokens = new DeleteAccountConfirmationService();
	console.log("Running scheduled task deleteExpired... ");
	try {
		deleteExpiredAccountConfirmationTokens.deleteExpired();
	} catch (err) {
		console.error("Error running scheduled tasks:", err);
	}
});
