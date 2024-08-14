import { query } from "../../db/dbConfig";

export class RetrieveAccountRepository {
	async query(accountId: string) {
		const queryText = `
      SELECT * FROM account WHERE id = $1;
    `;
		try {
			const res = await query(queryText, [accountId]);
			return res.rows[0];
		} catch (err) {
			console.error("Error retrieving account:", err);
			throw err;
		}
	}

	async retrieveAccounts() {
		const queryText = `
      SELECT * FROM account;
    `;
		try {
			const res = await query(queryText);
			return res.rows;
		} catch (err) {
			console.error("Error getting accounts:", err);
			throw err;
		}
	}
}