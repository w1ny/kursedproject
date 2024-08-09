import { query } from "../../db/dbConfig";

export class RetrieveUserRepository {
	async query(userId: string) {
		const queryText = `
      SELECT * FROM user WHERE id = $1;
    `;
		try {
			const res = await query(queryText, [userId]);
			return res.rows[0];
		} catch (err) {
			console.error("Error retrieving user:", err);
			throw err;
		}
	}

	async retrieveUsers() {
		const queryText = `
      SELECT * FROM user;
    `;
		try {
			const res = await query(queryText);
			return res.rows;
		} catch (err) {
			console.error("Error getting users:", err);
			throw err;
		}
	}
}