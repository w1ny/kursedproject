import { query } from "../../db/dbConfig";
import { AccountInterface } from "../../model/account/Account";
import { v4 as uuidv4 } from "uuid";

export class CreateAccountRepository {
  async query({ username, email, walletAddress }: Omit<AccountInterface, "id">) {
    const queryText = `
      INSERT INTO account (id, username, email, walletAddress, createdAt)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    try {
      const accountId = uuidv4();
      const res = await query(queryText, [accountId, username, email, walletAddress]);
      return res.rows[0];
    } catch (err) {
      console.error("Error creating account:", err);
      throw err;
    }
  }
}