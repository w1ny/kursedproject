import cron from "node-cron";
import { DeleteAppUserValidateService } from "../services/appUserValidate/DeleteAppUserValidateService";

cron.schedule("0 0 * * *", async () => {
	const deleteExpiredAccountConfirmationTokens = new DeleteAppUserValidateService();
	console.log("Running scheduled task deleteExpired... ");
	try {
		deleteExpiredAccountConfirmationTokens.deleteExpired();
	} catch (err) {
		console.error("Error running scheduled tasks:", err);
	}
});
