import { query } from "../../db/dbConfig";
import { UserInterface } from "../../model/user/User";

export class UpdateUserRepository {
	async query({ id, username, email, walletAddress }: UserInterface) {
		const queryText = `
      UPDATE user
      SET username = $1, email = $2, walletAddress = $3, updatedAt = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [username, email, walletAddress, id]);
			return res.rows[0];
		} catch (err) {
			console.error("Error updating user:", err);
			throw err;
		}
	}

	async updateUserWallet(userId: string, walletAddress: string) {
		const queryText = `
      UPDATE user
      SET walletAddress = $1, updatedAt = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [walletAddress, userId]);
			return res.rows[0];
		} catch (err) {
			console.error("Error updating user wallet:", err);
			throw err;
		}
	}
}
