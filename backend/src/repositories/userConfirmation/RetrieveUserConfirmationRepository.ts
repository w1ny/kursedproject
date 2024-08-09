import { query } from "../../db/dbConfig";

export class RetrieveUserConfirmationRepository {
	async query(confirmationId: string) {
		const queryText = `
		SELECT * FROM user_confirmation
		WHERE id = $1;
	  `;
		try {
			const res = await query(queryText, [confirmationId]);
			console.log("User confirmation token retrieved:", res.rows[0]);
			return res.rows[0];
		} catch (err) {
			console.error("Error retrieving user confirmation token:", err);
			throw err;
		}
	}

	async getUserConfirmationByToken(token: string) {
		const queryText = `
		SELECT * FROM user_confirmation
		WHERE confirmation_token = $1;
	  `;
		try {
			const res = await query(queryText, [token]);
			console.log("User confirmation token retrieved:", res.rows[0]);
			return res.rows[0];
		} catch (err) {
			console.error("Error retrieving user confirmation token by token:", err);
			throw err;
		}
	}
}
