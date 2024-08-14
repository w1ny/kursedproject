import { query } from "../../db/dbConfig";

export class RetrieveAccountConfirmationRepository {
	async query(confirmationId: string) {
		const queryText = `
		SELECT * FROM accountConfirmation
		WHERE id = $1;
	  `;
		try {
			const res = await query(queryText, [confirmationId]);
			console.log("Account confirmation token retrieved:", res.rows[0]);
			return res.rows[0];
		} catch (err) {
			console.error("Error retrieving account confirmation token:", err);
			throw err;
		}
	}

	async getAccountConfirmationByToken(token: string) {
		const queryText = `
		SELECT * FROM accountConfirmation
		WHERE confirmationToken = $1;
	  `;
		try {
			const res = await query(queryText, [token]);
			console.log("Account confirmation token retrieved:", res.rows[0]);
			return res.rows[0];
		} catch (err) {
			console.error("Error retrieving account confirmation token by token:", err);
			throw err;
		}
	}
}
