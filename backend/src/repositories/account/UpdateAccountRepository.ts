import { query } from "../../db/dbConfig";
import { AccountInterface } from "../../model/account/Account";

export class UpdateAccountRepository {
	async query({ id, username, email, walletAddress }: AccountInterface) {
		const queryText = `
      UPDATE account
      SET username = $1, email = $2, walletAddress = $3, updatedAt = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [username, email, walletAddress, id]);
			return res.rows[0];
		} catch (err) {
			console.error("Error updating account:", err);
			throw err;
		}
	}

	async updateAccountWallet(accountId: string, walletAddress: string) {
		const queryText = `
      UPDATE account
      SET walletAddress = $1, updatedAt = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;
		try {
			const res = await query(queryText, [walletAddress, accountId]);
			return res.rows[0];
		} catch (err) {
			console.error("Error updating account wallet:", err);
			throw err;
		}
	}
}
