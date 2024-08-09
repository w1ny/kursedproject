import { query } from "../../db/dbConfig";

export class DeleteUserRepository {
	async query(userId: string) {
		const queryText = `
      DELETE FROM user
      WHERE id = $1
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [userId]);
			console.log("User deleted:", res.rows[0]);
			return res.rows[0];
		} catch (err) {
			console.error("Error deleting user:", err);
			throw err;
		}
	}
}
