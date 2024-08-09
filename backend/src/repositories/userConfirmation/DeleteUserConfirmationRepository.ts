import { query } from "../../db/dbConfig";

export class DeleteUserConfirmationRepository {
	async query(confirmationId: string) {
		const queryText = `
      DELETE FROM user_confirmation
      WHERE id = $1
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [confirmationId]);
			console.log("User confirmation token deleted:", res.rows[0]);
			return res.rows[0];
		} catch (err) {
			console.error("Error deleting user confirmation token:", err);
			throw err;
		}
	}

	async deleteExpiredTokens(expireTime: string) {
		const queryText = `
      DELETE FROM user_confirmation
      WHERE created_at < NOW() - INTERVAL $1
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [expireTime]);
			console.log("Expired user confirmation tokens deleted:", res.rowCount);
			return res.rowCount;
		} catch (err) {
			console.error("Error deleting expired user confirmation tokens:", err);
			throw err;
		}
	}
}
