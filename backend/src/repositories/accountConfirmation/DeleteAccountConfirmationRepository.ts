import { query } from "../../db/dbConfig";

export class DeleteAccountConfirmationRepository {
	async query(confirmationId: string) {
		const queryText = `
      DELETE FROM accountConfirmation
      WHERE id = $1
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [confirmationId]);
			console.log("Account confirmation token deleted:", res.rows[0]);
			return res.rows[0];
		} catch (err) {
			console.error("Error deleting account confirmation token:", err);
			throw err;
		}
	}

	async deleteExpiredTokens(expireTime: string) {
		const queryText = `
      DELETE FROM accountConfirmation
      WHERE createdAt < NOW() - INTERVAL $1
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [expireTime]);
			console.log("Expired account confirmation tokens deleted:", res.rowCount);
			return res.rowCount;
		} catch (err) {
			console.error("Error deleting expired account confirmation tokens:", err);
			throw err;
		}
	}
}
