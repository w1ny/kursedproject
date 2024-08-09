import { query } from "../../db/dbConfig";

export class RetrieveConfigRepository {
	async query(key: string) {
		const queryText = "SELECT value FROM configuration WHERE key = $1";
		try {
			const res = await query(queryText, [key]);
			if (res.rows.length) {
				return res.rows[0].value;
			}
			return null;
		} catch (err) {
			console.error("Error retrieving config:", err);
			throw err;
		}
	}
}
