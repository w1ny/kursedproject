import { query } from "../../db/dbConfig";

export class DeleteAccountRepository {
	async query(accountId: string) {
		const queryText = `
      DELETE FROM account
      WHERE id = $1
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [accountId]);
			console.log("Account deleted:", res.rows[0]);
			return res.rows[0];
		} catch (err) {
			console.error("Error deleting account:", err);
			throw err;
		}
	}
}
